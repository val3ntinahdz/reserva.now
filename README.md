# reserva.now
<img width="1838" height="902" alt="image" src="https://github.com/user-attachments/assets/edaa648e-f693-4521-91d5-93a9e05504f7" />

Connecting local professionals and clients through interoperable payments.
Built for the Interledger Hackathon, reserva.now helps individuals and professionals schedule, manage, and pay for appointments in an open, transparent, and inclusive way — all powered by Open Payments (Interledger).

💳 Interledger Integration (Open Payments)
Our platform integrates Open Payments to allow seamless, programmable transactions between clients and service providers.
There are two transaction modes:
1. Partial Payments
The service provider can choose to charge a portion of the total appointment cost upfront.
The percentage charged can be configured individually.
Providers can also set cancellation policies (e.g., “no refund if canceled within 12 hours”).

2. Full Payments
The total amount is transferred directly through the Interledger network.
Providers can enable pre-paid or post-paid modes, depending on the service type.

## Features
👤 Client (Person booking the service)
1. Profile
Create account and user profile
Configure default notification preferences
Retrieve and edit user profile

2. Preferences
Get and edit notification settings

3. Appointments
Create appointment (with Open Payments integration)
{ client_id, provider_id, time, date } + token auth
Cancel appointment
View upcoming and past appointments
View individual appointment details
Browse available categories
Browse service providers (with filters like category, location)
View provider profile
Reschedule appointment
Edit appointment notes

🧰 Provider (Person offering the service)
1. Profile
Create account, profile, and default settings for notifications and transactions
Edit and retrieve profile

2. Appointments
View all bookings made by clients
Cancel appointments
View appointment details
(The “Confirm appointment” feature was considered but discarded for MVP.)

3. Dashboard Summary
Monthly analytics:
Total completed appointments
Revenue comparison between current and previous months

4. Preferences
Edit notification settings
Edit transaction settings

🧭 User Interface
Primary color: Yellow (soft tone, not fluorescent).
Main Screens
Home – Display past and upcoming bookings + recommended services in a clean grid layout.
Search – Dual navigation:
Search bar for service lookup.
Map view showing nearby bookable services based on current location.
Appointment History – List of past and completed bookings.
Account – User settings and preferences.

🎨 Professions and Trades Highlighted
We focus on independent workers, both formal and informal, to foster inclusion and digital growth in local economies.
Examples:
Art: Musicians, DJs, bands, mariachis
Beauty: Barbers, stylists, nail artists
Crafts: Local artisans and traditional makers (a special focus for our pitch)

🌍 Social Impact
Our mission is to democratize digital payments and visibility for professionals and artisans in underserved regions.
A donation system will allocate a free consultation for every fixed number of bookings made.
The project prioritizes rural and semi-urban communities.

Focused on social good, not monetization.

Long-term goal: become the “Amazon of local services.”
