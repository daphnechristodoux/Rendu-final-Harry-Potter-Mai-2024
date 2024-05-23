from machine import Pin # importe dans le code la lib qui permet de gérer les Pins de sortie

pin_rouge = 17
led_rouge = Pin(pin_rouge, mode=Pin.OUT)
pin_vert = 18
led_vert = Pin(pin_vert, mode=Pin.OUT)
pin_bleu = 19
led_bleu = Pin(pin_bleu, mode=Pin.OUT)

# Éteindre la LED
led_rouge.off()
led_vert.off()
led_bleu.off()

