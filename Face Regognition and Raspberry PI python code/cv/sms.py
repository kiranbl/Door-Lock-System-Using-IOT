# ------------------------------------------------------------------------------
# Imports
import os
from twilio.rest import Client

def smssend():
# ------------------------------------------------------------------------------
# Configurations
    account_sid = ""
    auth_token = ""

    # ------------------------------------------------------------------------------
    # Setting the client with the configurations
    client = Client(account_sid, auth_token)

    # ------------------------------------------------------------------------------
    # Creating the message
    client.messages.create(
        to="",
        from_="",
        body="Someone is at the door... plz follow this link to allow https://iot-webapplication.herokuapp.com"
    )
    
smssend()
