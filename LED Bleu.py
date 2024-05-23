from machine import Pin
import time

# Déclaration de la broche pour contrôler la LED bleue
pin_bleu = 19
led_bleu = Pin(pin_bleu, mode=Pin.OUT)

led_bleu.on()   # Allumer la LED bleue

