# App purpose
Payments signature app
User inputs payments, these are signed with a random 10 x 10 alphabetic matrix and local time, stored, and ready to be sent to an API.

# Modules
App is very small - one module can fit all the functionality (App Module)

# Pages
Generator page
Payments page

# Services
Signature generator service:
    Generates a new 2D matrix and 2 digit code (signature) every 2 sec.

Payments service:
    Remembers payments made, along with its signature.

