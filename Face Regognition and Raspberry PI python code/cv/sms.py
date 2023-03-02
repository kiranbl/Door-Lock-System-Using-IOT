# ------------------------------------------------------------------------------
# Imports
import os
from twilio.rest import Client

def smssend():
# ------------------------------------------------------------------------------
# Configurations
    account_sid = "AC6c84705f8670736bed69983a15166cb7"
    auth_token = "c16cefc4ffd1719d2721c789a93500aa"

    # ------------------------------------------------------------------------------
    # Setting the client with the configurations
    client = Client(account_sid, auth_token)

    # ------------------------------------------------------------------------------
    # Creating the message
    client.messages.create(
        to="+91 87928 95368",
        from_="+1 951 457 5054",
        body="Someone is at the door... plz follow this link to allow https://iot-webapplication.herokuapp.com"
    )
    
smssend()
