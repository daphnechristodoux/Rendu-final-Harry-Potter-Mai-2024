from machine import Pin, PWM
import time

# Déclaration des broches pour contrôler les LEDs Rouge, Vert et Bleu
pin_rouge = 17
pin_vert = 18
pin_bleu = 19

# Configuration des broches en mode PWM
led_rouge = PWM(Pin(pin_rouge))
led_vert = PWM(Pin(pin_vert))
led_bleu = PWM(Pin(pin_bleu))

# Fonction pour définir la couleur jaune (Rouge + Vert)
def set_jaune():
    led_vert.duty_u16(1000)   
    led_rouge.duty_u16(1000)  
    led_bleu.duty_u16(0000)   

while True:
    set_jaune() 
    time.sleep(1)

