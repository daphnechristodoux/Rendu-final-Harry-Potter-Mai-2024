import network  # Importe les fonctions liées au Wi-Fi
import urequests  # Importe les fonctions liées aux requêtes HTTP
import utime  # Importe les fonctions liées au temps
from machine import Pin, PWM  # Importe les fonctions liées aux broches de sortie

# Met la Raspberry Pi en mode client Wi-Fi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)  # Active le mode client Wi-Fi

ssid = 'Myrtille'
password = '32C7JC5RBK'
wlan.connect(ssid, password)  # Connecte la Raspberry Pi au réseau Wi-Fi, affiche le password ce qui n'est pas bien

# Attends jusqu'à ce que la connexion Wi-Fi soit établie
while not wlan.isconnected():
    print("Connexion en cours...")
    utime.sleep(1)

print("Connecté au réseau Wi-Fi")

# broches pour les LEDs rouge, vert et bleu
pin_rouge = 17
pin_vert = 18
pin_bleu = 19

# broches en mode PWM
led_rouge = PWM(Pin(pin_rouge))
led_vert = PWM(Pin(pin_vert))
led_bleu = PWM(Pin(pin_bleu))


# Fonctions pour éteindre toutes les LEDs et pour allumer les couleurs
def eteindre_led():
    led_rouge.duty_u16(0)  
    led_vert.duty_u16(0)   
    led_bleu.duty_u16(0)   

def allumer_jaune():
    led_vert.duty_u16(1000)   
    led_rouge.duty_u16(1000)  
    led_bleu.duty_u16(0) 

def allumer_violet():
    led_rouge.duty_u16(1000)   
    led_vert.duty_u16(0)    
    led_bleu.duty_u16(1000)

# Définit l'URL du serveur pour contrôler les LEDs
url_led = "http://192.168.1.52:5000/led"

while True:
    try:
        print("GET")
        r = urequests.get(url_led)  # Lance une requête sur l'URL du serveur
        action = r.url.split("/")[-1]  # Extrait l'action de l'URL

        if action == 'eteindre':
            eteindre_led()  
            print("Action : Éteindre les LEDs")
        elif action == 'allumer_bleu':
            led_bleu.duty_u16(30000)
            print("Action : Allumer la LED en bleu")
        elif action == 'allumer_vert':
            led_vert.duty_u16(30000)
            print("Action : Allumer la LED en vert")
        elif action == 'allumer_rouge':
            led_rouge.duty_u16(30000)
            print("Action : Allumer la LED en rouge")
        elif action == 'allumer_jaune':
            allumer_jaune()
            print("Action : Allumer la LED en jaune")
        elif action == 'allumer_violet':
            allumer_violet()
            print("Action : Allumer la LED en violet")
        else:
            print("Action non reconnue:", action)

        r.close()  # Ferme la demande
        utime.sleep(1)
    except Exception as e:
        print("Erreur lors de la requête GET:", e)
