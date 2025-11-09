import { createAuthenticatedClient, isFinalizedGrant, OpenPaymentsClientError } from '@interledger/open-payments';
import { readFileSync } from 'fs';
import path from 'path';

// Configuración de tu wallet principal (el que hace las solicitudes)
const walletPrincipal = "https://ilp.interledger-test.dev/reserve-now-demo";
const keyId = "818ac865-8812-4dc4-bdc2-9d50effea1f0";

// Cliente autenticado (reutilizable)
let authenticatedClient = null;

/**
 * Obtiene o crea un cliente autenticado
 */
async function getClient() {
  if (authenticatedClient) {
    return authenticatedClient;
  }

  try {
    const privateKeyPath = path.join(process.cwd(), 'keys', 'private.key');
    
    console.log("Private key path:", privateKeyPath);
    
    const privateKey = readFileSync(privateKeyPath, 'utf8');
    console.log("LOADED PRIVATE KEY", privateKey);
    
    // Crear cliente autenticado
    authenticatedClient = await createAuthenticatedClient({
      walletAddressUrl: walletPrincipal,
      privateKey: privateKey,
      keyId: keyId
    });

    console.log("✓ Authenticated client created");
    return authenticatedClient;

  } catch (error) {
    console.error("Error creating client:", error.message);
    throw error;
  }
}

/**
 * Obtiene información de un wallet
 */
async function getWalletInfo(walletUrl) {
  const client = await getClient();
  
  try {
    const walletInfo = await client.walletAddress.get({
      url: walletUrl
    });

    console.log(`✓ Wallet info retrieved: ${walletInfo.id}`);
    return walletInfo;

  } catch (error) {
    console.error("Error getting wallet info:", error.message);
    throw error;
  }
}

/**
 * Crea un incoming payment para el proveedor
 */
async function createIncomingPayment(proveedorWalletUrl, amount, description, expiresInMinutes = 60) {
  try {
    const client = await getClient();
    const receiverWallet = await getWalletInfo(proveedorWalletUrl);

    console.log(`Creating incoming payment for ${amount} ${receiverWallet.assetCode}`);
    console.log(`Provider wallet: ${proveedorWalletUrl}`);

    // Solicitar grant para crear incoming payment
    const incomingGrant = await client.grant.request(
      {
        url: receiverWallet.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: "incoming-payment",
              actions: ["read", "complete", "create"],
            },
          ],
        },
      },
    );

    if (!isFinalizedGrant(incomingGrant)) {
      throw new Error('Expected finalized incoming payment grant');
    }

    console.log("✓ Incoming payment grant created");

    // Crear incoming payment
    const incomingPayment = await client.incomingPayment.create(
      {
        url: receiverWallet.resourceServer,
        accessToken: incomingGrant.access_token.value,
      },
      {
        walletAddress: receiverWallet.id,
        incomingAmount: {
          value: Math.round(amount * Math.pow(10, receiverWallet.assetScale)).toString(),
          assetCode: receiverWallet.assetCode,
          assetScale: receiverWallet.assetScale,
        },
        expiresAt: new Date(Date.now() + expiresInMinutes * 60_000).toISOString(),
        metadata: {
          description: description || 'Payment request'
        }
      }
    );

    console.log("✓ Created incoming payment:", incomingPayment.id);
    return incomingPayment;

  } catch (error) {
    console.error("Error creating incoming payment:", error);
    throw new Error(`Failed to create incoming payment: ${error.message}`);
  }
}

/**
 * Crea un quote para calcular costos
 */
async function createQuote(clienteWalletUrl, incomingPaymentUrl) {
  try {
    const client = await getClient();
    const sendingWallet = await getWalletInfo(clienteWalletUrl);

    console.log(`Creating quote for payment to ${incomingPaymentUrl}`);
    console.log(`Client wallet: ${clienteWalletUrl}`);

    // Solicitar grant para quote
    const quoteGrant = await client.grant.request(
      {
        url: sendingWallet.authServer, 
      },
      {
        access_token: {
          access: [
            {
              type: "quote",
              actions: ["create", "read"],
            },
          ],
        },
      },
    );

    if (!isFinalizedGrant(quoteGrant)) {
      throw new Error("Expected finalized quote grant");
    }

    console.log("✓ Quote grant created");

    // Crear quote
    const quote = await client.quote.create(
      {
        url: sendingWallet.resourceServer,
        accessToken: quoteGrant.access_token.value,
      }, 
      {
        method: "ilp",
        walletAddress: sendingWallet.id,
        receiver: incomingPaymentUrl
      }
    );

    console.log("✓ Created quote:", quote.id);
    return quote;

  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error(`Failed to create quote: ${error.message}`);
  }
}

/**
 * Crea un outgoing payment (requiere autorización del usuario)
 */
async function createOutgoingPayment(clienteWalletUrl, quote) {
  try {
    const client = await getClient();
    const sendingWallet = await getWalletInfo(clienteWalletUrl);

    console.log(`Creating outgoing payment for quote: ${quote.id}`);
    console.log(`Client wallet: ${clienteWalletUrl}`);

    // Solicitar grant con interacción
    const outgoingPaymentGrant = await client.grant.request(
      {
        url: sendingWallet.authServer,
      },
      {
        access_token: {
          access: [
            {
              identifier: sendingWallet.id,
              type: "outgoing-payment",
              actions: ["read", "create"],
              limits: {
                debitAmount: quote.debitAmount
              }
            },
          ],
        },
        interact: { 
          start: ["redirect"]
        }
      },
    );

    console.log('✓ Got pending outgoing payment grant', outgoingPaymentGrant);

    // Verificar si requiere autorización
    if (outgoingPaymentGrant.interact && outgoingPaymentGrant.interact.redirect) {
      console.log('✓ Payment requires user authorization');
      
      return {
        requiresInteraction: true,
        interactionUrl: outgoingPaymentGrant.interact.redirect,
        continueUri: outgoingPaymentGrant.continue.uri,
        continueToken: outgoingPaymentGrant.continue.access_token.value,
        message: "User authorization required"
      };
    }

    throw new Error("Unexpected grant state");
    
  } catch (error) {
    console.error("Error in createOutgoingPayment:", error);
    throw new Error(`Failed to create outgoing payment: ${error.message}`);
  }
}

/**
 * FUNCIÓN PRINCIPAL: Inicia el flujo completo de pago
 * Ahora recibe los wallet addresses dinámicamente
 */
async function initiatePayment(clienteWalletUrl, proveedorWalletUrl, amount, description = "Service payment") {
  try {
    console.log(`\n=== Starting Payment Flow ===`);
    console.log(`Amount: ${amount}`);
    console.log(`Description: ${description}`);
    console.log(`Client: ${clienteWalletUrl}`);
    console.log(`Provider: ${proveedorWalletUrl}`);

    // Paso 1: Crear incoming payment (proveedor)
    console.log("\n[Step 1/3] Creating incoming payment...");
    const incomingPayment = await createIncomingPayment(proveedorWalletUrl, amount, description);
    
    // Paso 2: Crear quote (calcular costos)
    console.log("\n[Step 2/3] Creating quote...");
    const quote = await createQuote(clienteWalletUrl, incomingPayment.id);
      
    // Paso 3: Crear outgoing payment (cliente autoriza)
    console.log("\n[Step 3/3] Creating outgoing payment...");
    const outgoingPayment = await createOutgoingPayment(clienteWalletUrl, quote);

    // Formatear montos
    const debitAmount = {
      value: quote.debitAmount.value / Math.pow(10, quote.debitAmount.assetScale),
      assetCode: quote.debitAmount.assetCode,
      formatted: `${quote.debitAmount.value / Math.pow(10, quote.debitAmount.assetScale)} ${quote.debitAmount.assetCode}`
    };

    const receiveAmount = {
      value: quote.receiveAmount.value / Math.pow(10, quote.receiveAmount.assetScale),
      assetCode: quote.receiveAmount.assetCode,
      formatted: `${quote.receiveAmount.value / Math.pow(10, quote.receiveAmount.assetScale)} ${quote.receiveAmount.assetCode}`
    };

    if (outgoingPayment.requiresInteraction) {
      console.log("\n✓ Payment setup complete - awaiting user authorization");
      
      return {
        success: true,
        status: 'PENDING_AUTHORIZATION',
        requiresInteraction: true,
        authorizationUrl: outgoingPayment.interactionUrl,
        continueToken: outgoingPayment.continueToken,
        continueUri: outgoingPayment.continueUri,
        quoteId: quote.id,
        incomingPaymentId: incomingPayment.id,
        amount: amount,
        debitAmount: debitAmount,
        receiveAmount: receiveAmount,
        message: 'Cliente debe autorizar el pago en su wallet'
      };
    }
    
    console.log("\n✓ Payment completed without interaction");

    return {
      success: true,
      status: 'COMPLETED',
      paymentId: outgoingPayment.paymentId,
      incomingPaymentId: incomingPayment.id,
      quoteId: quote.id,
      amount: amount,
      debitAmount: debitAmount,
      receiveAmount: receiveAmount,
      message: 'Payment completed successfully'
    };
    
  } catch (error) {
    console.error("\n✗ Error in payment flow:", error);

    return {
      success: false,
      status: 'FAILED',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Completa el pago después de que el usuario autoriza
 */
async function completePaymentAfterAuth(quoteId, continueUri, continueToken) {
  try {
    const client = await getClient();

    console.log('\n=== Completing Payment After Authorization ===');
    
    // Continuar el grant con la autorización
    const finalizedGrant = await client.grant.continue({
      url: continueUri,
      accessToken: continueToken
    });

    console.log("✓ Grant finalized after authorization");

    if (!isFinalizedGrant(finalizedGrant)) {
      throw new Error('Grant was not finalized after authorization');
    }

    // Para completar el payment necesitamos el wallet del cliente
    // Esto debería venir del contexto o guardarse temporalmente
    // Por ahora, usaremos una función auxiliar para obtenerlo del quote
    const quoteInfo = await getQuoteInfo(quoteId);
    
    const outgoingPayment = await client.outgoingPayment.create(
      {
        url: quoteInfo.resourceServer,
        accessToken: finalizedGrant.access_token.value,
      },
      {
        walletAddress: quoteInfo.walletAddress,
        quoteId: quoteId,
      },
    );

    console.log("✓ Payment created:", outgoingPayment.id);
    console.log("✓ Payment state:", outgoingPayment.state);

    return {
      success: true,
      status: 'COMPLETED',
      paymentId: outgoingPayment.id,
      state: outgoingPayment.state,
      message: 'Payment completed successfully'
    };

  } catch (error) {
    console.error("✗ Error completing payment:", error);
    return {
      success: false,
      status: 'FAILED',
      error: error.message
    };
  }
}

/**
 * Función auxiliar para obtener información del quote
 */
async function getQuoteInfo(quoteId) {
  // En una implementación real, esto debería venir de tu base de datos
  // o del contexto guardado. Por ahora retornamos valores por defecto.
  const client = await getClient();
  const defaultWallet = await getWalletInfo("https://ilp.interledger-test.dev/cliente-jorge");
  
  return {
    resourceServer: defaultWallet.resourceServer,
    walletAddress: defaultWallet.id
  };
}

export {
  getClient,
  getWalletInfo,
  createIncomingPayment,
  createQuote,
  createOutgoingPayment,
  initiatePayment,
  completePaymentAfterAuth
};