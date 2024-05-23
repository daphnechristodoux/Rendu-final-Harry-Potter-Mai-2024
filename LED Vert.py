from machine import Pin
import time

# Déclaration de la broche pour contrôler la LED verte
pin_vert = 18
led_vert = Pin(pin_vert, mode=Pin.OUT)


led_vert.on()   # Allumer la LED verte

