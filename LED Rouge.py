from machine import Pin
import time

# Déclaration de la broche pour contrôler la LED rouge
pin_rouge = 17
led_rouge = Pin(pin_rouge, mode=Pin.OUT)

led_rouge.on()  # Allumer la LED rouge
