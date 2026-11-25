window.QUIZ_COURSES = window.QUIZ_COURSES || {};
window.QUIZ_COURSES["telecomunicazioni"] = {
  "course_id": "telecomunicazioni",
  "course_title": "Reti di Telecomunicazioni",
  "course_badge": "TLC",
  "version": "1.0.0",
  "topics": {
    "fondamenti": "01 · Fondamenti, Topologie e Architetture",
    "rete": "02 · Livello Rete (IPv4, Subnetting, ICMP, DHCP, NAT, IPv6)",
    "collegamento": "03 · Livello Collegamento e Fisico (MAC, ALOHA, CSMA, ARP, Ethernet, Wi-Fi)",
    "trasporto_app": "04 · Livello Trasporto (UDP, TCP) e Applicativo (DNS, HTTP, Mail)"
  },
  "questions": [
    {
      "id": 1,
      "title": "Proxy ARP e Switch Ethernet",
      "topic": "collegamento",
      "question": "Alcuni switch Ethernet implementano la funzione di proxy ARP, ovvero sono in grado di rispondere a una richiesta ARP (Address Resolution Protocol) al posto dell'host target. Come imparano le associazioni tra indirizzo MAC ed indirizzo IP?",
      "options": [
        {
          "origKey": "a",
          "text": "Osservando il traffico in transito e inviando dei comandi di \"ping\" per verificare lo stato delle interfacce degli host."
        },
        {
          "origKey": "b",
          "text": "Osservando il traffico in transito e memorizzando l'associazione presente nelle trame in una tabella di cache."
        },
        {
          "origKey": "c",
          "text": "Interrogando il server DHCP (Dynamic Host Configuration Protocol) periodicamente per tenere aggiornata la tabella di cache in base alle assegnazioni del DHCP."
        },
        {
          "origKey": "d",
          "text": "Interrogando periodicamente tutte le interfacce degli host a lui collegati per tenere aggiornata la tabella di cache indipendentemente dal server DHCP."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 826, RFC 1027, IEEE 802.1D",
      "explanation": [
        "<strong>IP vs MAC:</strong> L'indirizzo IP (Livello 3 - Rete) è un indirizzo <em>logico</em> globale che serve a instradare i pacchetti attraverso Internet fino alla sottorete di destinazione. L'indirizzo MAC (Livello 2 - Data Link) è invece un indirizzo <em>fisico/hardware</em> inciso sulla scheda di rete dal produttore, valido solo <em>localmente</em>.",
        "<strong>Protocollo ARP:</strong> Quando un host vuole inviare un datagramma IP a un nodo nella stessa sottorete, conosce il suo IP ma non il suo MAC. Usa quindi ARP (<em>broadcast and select</em>): invia una richiesta in <strong>broadcast</strong> chiedendo \"Chi ha questo IP?\" e il proprietario risponde in <strong>unicast</strong> con il proprio MAC.",
        "<strong>Proxy ARP / ARP Caching:</strong> Per evitare traffico broadcast eccessivo (<em>broadcast storm</em>), gli switch osservano silenziosamente le trame in transito, salvano in una <strong>tabella di cache</strong> le coppie IP–MAC che vedono passare e rispondono direttamente alle richieste ARP al posto del destinatario."
      ],
      "wrongReasons": "Lo switch è un apparato passivo di Livello 2 che impara osservando il traffico; non invia <code>ping</code> ({{opt:a}}) né interroga periodicamente DHCP ({{opt:c}}) o gli host ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 2,
      "title": "Il meccanismo di riscontro (ACK) nel ricevitore TCP",
      "topic": "trasporto_app",
      "question": "Alla ricezione di un segmento corretto e in sequenza, un ricevitore TCP:",
      "options": [
        {
          "origKey": "a",
          "text": "Invia un ACK cumulativo che contiene la lista di tutti i segmenti ricevuti fino a quel momento."
        },
        {
          "origKey": "b",
          "text": "Invia un ACK selettivo del segmento stesso indicando il segmento successivo che si aspetta di ricevere, ovvero il segmento successivo al segmento ricevuto."
        },
        {
          "origKey": "c",
          "text": "Invia un ACK cumulativo di tutto quanto ricevuto fino a quell'istante indicando l'ultimo byte del segmento ricevuto."
        },
        {
          "origKey": "d",
          "text": "Invia un ACK cumulativo di tutto quanto ricevuto fino a quell'istante indicando il byte successivo che si aspetta di ricevere, ovvero il byte successivo all'ultimo byte del segmento ricevuto."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9293",
      "explanation": [
        "<strong>TCP (Livello 4 - Trasporto)</strong> offre un servizio affidabile e ordinato. Non numera i segmenti, ma numera i singoli <strong>byte</strong> del flusso dati (nel campo <code>Sequence Number</code> indica il primo byte del segmento).",
        "<strong>ACK cumulativo:</strong> Quando il ricevitore riceve un segmento corretto e in sequenza, invia un messaggio di conferma (<strong>ACK</strong>) che riscontra tutti i byte ricevuti in ordine fino a quel momento. Nel campo <code>Acknowledgment Number</code> dell'header scrive <strong>il numero del prossimo byte che si aspetta di ricevere</strong> (quindi l'ultimo byte ricevuto + 1)."
      ],
      "wrongReasons": "Non invia una lista di segmenti ({{opt:a}}), non usa ACK selettivi basati sul numero di segmento ({{opt:b}}) e non indica l'ultimo byte ricevuto ma quello successivo ({{opt:c}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 3,
      "title": "Formula della capacità massima di un canale (Teorema di Shannon)",
      "topic": "fondamenti",
      "question": "Claude Shannon, padre della teoria dell'informazione ha proposto un modello di canale di trasmissione noto come AWGN (Additive White Gaussian Noise). Chiamati B la banda del canale in Hz, S l'energia associata ai bit trasmessi e N l'energia del rumore additivo, qual è la capacità massima C in bit/s, in base alla teoria di Shannon, di questo canale trasmissivo?",
      "options": [
        {
          "origKey": "a",
          "text": "C = B log<sub>2</sub>(N/S + 1)"
        },
        {
          "origKey": "b",
          "text": "C = B log<sub>2</sub>(S/N + 1)"
        },
        {
          "origKey": "c",
          "text": "C = B [log<sub>2</sub>(S/N)] + 1"
        },
        {
          "origKey": "d",
          "text": "C = S log<sub>2</sub>(B/N + 1)"
        }
      ],
      "correctKey": "b",
      "refs": "Teorema di Shannon-Hartley",
      "explanation": [
        "Quando si trasmette un segnale <em>s(t)</em> su un canale fisico, il ricevitore riceve una versione attenuata più del rumore: <em>r(t) = αs(t) + n(t)</em>.",
        "Nel modello <strong>AWGN</strong> (<em>Additive White Gaussian Noise</em>), in cui gli errori dipendono solo dal rumore termico, Claude Shannon ha dimostrato che la velocità massima teorica di trasmissione senza errori (<strong>Capacità C</strong>, in bit/s) è:<br><code>C = B · log<sub>2</sub>(S/N + 1)</code><br>dove <em>B</em> è la banda in Hz, <em>S</em> è l'energia associata a un bit trasmesso e <em>N</em> è l'energia del rumore termico."
      ],
      "wrongReasons": "Le formule ({{opt:a}}), ({{opt:c}}) e ({{opt:d}}) invertono i termini o spostano erroneamente il <code>+1</code> fuori dal logaritmo.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 4,
      "title": "Protocollo di trasporto affidabile Stop and Wait",
      "topic": "trasporto_app",
      "question": "Cosa caratterizza un protocollo di trasporto affidabile di tipo Stop and Wait?",
      "options": [
        {
          "origKey": "a",
          "text": "Una finestra di trasmissione e ricezione pari a 1 PDU."
        },
        {
          "origKey": "b",
          "text": "Una finestra di congestione pari a 1 PDU."
        },
        {
          "origKey": "c",
          "text": "Tempo di trasmissione di 1 PDU pari a 1 RTT."
        },
        {
          "origKey": "d",
          "text": "Una finestra di ricezione pari a 1 PDU, quella di trasmissione può essere maggiore."
        }
      ],
      "correctKey": "a",
      "refs": "Teoria ARQ",
      "explanation": [
        "Una <strong>PDU</strong> (<em>Protocol Data Unit</em>) è l'unità dati scambiata da un protocollo a un dato livello.",
        "Nei protocolli affidabili con ritrasmissione automatica (<strong>ARQ</strong>), lo <strong>Stop and Wait</strong> è il meccanismo più semplice: il trasmettitore invia <strong>1 sola PDU</strong>, ne salva una copia, avvia un timer e si ferma (<em>Stop</em>) in attesa (<em>Wait</em>) dell'ACK dal ricevitore. Solo dopo aver ricevuto l'ACK può inviare la PDU successiva. Ciò equivale a un protocollo a finestra in cui sia la finestra di trasmissione (<em>W<sub>T</sub></em>) sia quella di ricezione (<em>W<sub>R</sub></em>) valgono <strong>1 PDU</strong>."
      ],
      "wrongReasons": "La finestra di congestione è specifica di TCP ({{opt:b}}); il tempo di trasmissione di 1 PDU è molto minore di 1 RTT ({{opt:c}}); la finestra di trasmissione non può essere maggiore di 1 ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 5,
      "title": "Significato della finestra di ricezione (W_R)",
      "topic": "trasporto_app",
      "question": "Cosa rappresenta la finestra di ricezione in un protocollo a finestra del livello trasporto?",
      "options": [
        {
          "origKey": "a",
          "text": "La quantità di dati che il ricevitore può accettare dal livello applicativo per rispondere alle richieste del trasmettitore."
        },
        {
          "origKey": "b",
          "text": "La quantità di dati che il ricevitore può memorizzare senza consegnare dati al livello applicativo."
        },
        {
          "origKey": "c",
          "text": "La quantità di dati che il ricevitore memorizza prima di iniziare a trasferirli al livello applicativo."
        },
        {
          "origKey": "d",
          "text": "La quantità di memoria che il protocollo dedica all'informazione che potrebbe essere ritrasmessa, in modo da poter mandare un messaggio di \"dati duplicati\" se il trasmettitore li ritrasmette."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 9293",
      "explanation": [
        "Quando i dati arrivano al livello Trasporto del destinatario, vengono parcheggiati in un buffer in memoria RAM in attesa che l'applicazione li legga. La <strong>finestra di ricezione (W<sub>R</sub>)</strong> rappresenta lo spazio disponibile in questo buffer per memorizzare dati in arrivo (inclusi eventuali segmenti arrivati fuori sequenza, da riordinare prima della consegna all'applicazione).",
        "Comunicando questo valore al trasmettitore, si realizza il <strong>controllo di flusso</strong>, evitando che un trasmettitore veloce mandi in overflow la memoria di un ricevitore lento."
      ],
      "wrongReasons": "Non riguarda i dati prelevati dal livello applicativo ({{opt:a}}), non è una soglia minima prima di iniziare a trasferire ({{opt:c}}) e la copia per eventuali ritrasmissioni sta sul trasmettitore, non sul ricevitore ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 6,
      "title": "Numero minimo di canali bidirezionali per connettere N nodi",
      "topic": "fondamenti",
      "question": "Data una rete di N nodi, qual è il numero minimo di canali bidirezionali per costruire una topologia che connette tutti i nodi e qual è questa topologia?",
      "options": [
        {
          "origKey": "a",
          "text": "N − 1, topologia: albero."
        },
        {
          "origKey": "b",
          "text": "1, topologia: bus passivo."
        },
        {
          "origKey": "c",
          "text": "N, topologia: stella."
        },
        {
          "origKey": "d",
          "text": "N, topologia: anello."
        }
      ],
      "correctKey": "a",
      "refs": "Teoria dei grafi / Appunti del corso",
      "explanation": [
        "Una rete con <em>N</em> nodi (vertici) e <em>C</em> canali bidirezionali (archi) si rappresenta come un grafo <em>G = (V, A)</em>.",
        "La topologia ad <strong>albero</strong> (grafo connesso e aciclico) collega tutti gli <em>N</em> nodi usando esattamente <strong>C = N − 1</strong> canali: è il numero minimo assoluto per garantire che esista almeno un percorso tra ogni coppia di nodi. Il suo svantaggio è che la rottura di un solo canale isola una parte della rete."
      ],
      "wrongReasons": "Il bus passivo ({{opt:b}}) ha <em>C = 1</em> singolo canale broadcast condiviso, non una topologia punto-punto tra <em>N</em> nodi commutati; stella e anello bidirezionale ({{opt:c}}, {{opt:d}}) richiedono <em>C = N</em> canali.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 7,
      "title": "Calcolo di SRTT e RTTVAR in TCP",
      "topic": "trasporto_app",
      "question": "Date le seguenti variabili: RTT = valore del campione di Round Trip Time appena misurato, SRTT = stima del valore medio del Round Trip Time, RTTVAR = stima della varianza del Round Trip Time; il protocollo TCP calcola SRTT e RTTVAR nel seguente modo:",
      "options": [
        {
          "origKey": "a",
          "text": "SRTT = 0.9 × SRTT + 0.1 × RTT; RTTVAR = 0.7 × RTTVAR + 0.3 × |SRTT − RTT|"
        },
        {
          "origKey": "b",
          "text": "SRTT = SRTT + (1/8) × RTT; RTTVAR = (3/4) × RTTVAR + (1/4) × |RTTVAR − RTT|"
        },
        {
          "origKey": "c",
          "text": "SRTT = (7/8) × SRTT + (1/8) × RTT; RTTVAR = (3/4) × RTTVAR + (1/4) × (SRTT − RTT)"
        },
        {
          "origKey": "d",
          "text": "SRTT = (7/8) × SRTT + (1/8) × RTT; RTTVAR = (3/4) × RTTVAR + (1/4) × |SRTT − RTT|"
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 6298, Sez. 2.3",
      "explanation": [
        "L'<strong>RTT</strong> (<em>Round Trip Time</em>) è il tempo di andata e ritorno di un segmento e del relativo ACK. TCP mantiene due stime aggiornate tramite medie mobili esponenziali pesate (con pesi standard α = 1/8 e β = 1/4):",
        "<strong>1. SRTT (Smoothed RTT):</strong> pesa per 7/8 il valore storico e per 1/8 l'ultimo campione misurato:<br><code>SRTT = (7/8)·SRTT + (1/8)·RTT</code>",
        "<strong>2. RTTVAR (RTT Variation):</strong> pesa per 3/4 la varianza precedente e per 1/4 lo scarto assoluto <code>|SRTT − RTT|</code>:<br><code>RTTVAR = (3/4)·RTTVAR + (1/4)·|SRTT − RTT|</code>"
      ],
      "wrongReasons": "La ({{opt:a}}) usa coefficienti errati (0.9/0.1 e 0.7/0.3); la ({{opt:b}}) omette 7/8 e usa RTTVAR al posto di SRTT nello scarto; la ({{opt:c}}) omette il valore assoluto (rendendo possibile una varianza negativa).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 8,
      "title": "Caratteristiche del protocollo DHCP",
      "topic": "rete",
      "question": "DHCP (Dynamic Host Configuration Protocol) è un protocollo:",
      "options": [
        {
          "origKey": "a",
          "text": "Connectionless (su UDP) con 4-way handshake: Discover, Offer, Request, Confirm."
        },
        {
          "origKey": "b",
          "text": "Connectionless (su UDP) con 3-way handshake: Discover, Request, Offer."
        },
        {
          "origKey": "c",
          "text": "Connection-oriented (su TCP) con 4-way handshake: Discover, Offer, Request, Confirm."
        },
        {
          "origKey": "d",
          "text": "Connection-oriented (su TCP) con 3-way handshake: Discover, Request, Offer."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 2131",
      "explanation": [
        "<strong>DHCP</strong> configura automaticamente un host appena collegato a una sottorete. Poiché l'host non ha ancora un IP e non conosce l'IP del server DHCP, deve inviare messaggi in broadcast (<code>255.255.255.255</code>). TCP non supporta il broadcast, quindi DHCP si appoggia a <strong>UDP</strong> (connectionless, porte <code>67</code> server / <code>68</code> client).",
        "La procedura avviene in <strong>4 fasi (4-way handshake)</strong>: 1) <strong>Discover</strong> (<code>DHCPDISCOVER</code>), 2) <strong>Offer</strong> (<code>DHCPOFFER</code>), 3) <strong>Request</strong> (<code>DHCPREQUEST</code>), 4) <strong>Confirm</strong> (<code>DHCPACK</code>, indicato come Confirm negli appunti del corso)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 9,
      "title": "Parametri configurati dal DHCP",
      "topic": "rete",
      "question": "DHCP (Dynamic Host Configuration Protocol) serve a configurare in modo automatico un host quando questo si collega ad una rete locale. Quale dei seguenti parametri NON viene configurato dal DHCP?",
      "options": [
        {
          "origKey": "a",
          "text": "Indirizzo IP del server DNS locale."
        },
        {
          "origKey": "b",
          "text": "Subnet Mask dell'host richiedente."
        },
        {
          "origKey": "c",
          "text": "Indirizzo MAC dell'host richiedente."
        },
        {
          "origKey": "d",
          "text": "Indirizzo IP dell'host richiedente."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 2131",
      "explanation": [
        "DHCP fornisce all'host i parametri <strong>logici</strong> di rete: <strong>indirizzo IP</strong>, <strong>Subnet Mask</strong>, <strong>Default Gateway</strong> (router della sottorete) e indirizzo IP del <strong>server DNS locale</strong>.",
        "L'<strong>indirizzo MAC</strong> invece è un indirizzo hardware/fisico inciso in fabbrica sulla scheda di rete dal produttore (IEEE 802): non viene assegnato dal DHCP, ma è il client stesso a inserirlo nel campo <code>chaddr</code> del messaggio DHCP durante la richiesta."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 10,
      "title": "Probabilità di collisione in un BSS 802.11 con CW_min = 32",
      "topic": "collegamento",
      "question": "Due stazioni di un BSS 802.11 rilevano il canale occupato e attendono quindi la fine del dialogo sul canale per iniziare una procedura di accesso. Nell'ipotesi che siano le uniche due stazioni coinvolte nella procedura e che CW<sub>min</sub> = 32 per entrambe, qual è la probabilità di collisione?",
      "options": [
        {
          "origKey": "a",
          "text": "2/32"
        },
        {
          "origKey": "b",
          "text": "1/2"
        },
        {
          "origKey": "c",
          "text": "1/32"
        },
        {
          "origKey": "d",
          "text": "(1/32) × (1 − 1/32)"
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.11",
      "explanation": [
        "Nel Wi-Fi (IEEE 802.11), quando due stazioni sentono il canale occupato, attendono la fine del dialogo in corso più un tempo <strong>DIFS</strong>. Poi ciascuna estrae un numero intero casuale tra 0 e <em>CW<sub>min</sub> − 1</em> (con <em>CW<sub>min</sub> = 32</em>, cioè 32 possibili valori equiprobabili) ed esegue un conto alla rovescia slot per slot.",
        "Due stazioni collidono se e solo se arrivano a 0 nello stesso slot, cioè se estraggono <strong>lo stesso identico numero</strong>. Qualunque numero estragga la prima stazione, la probabilità che la seconda estragga esattamente quello stesso numero su 32 scelte equiprobabili è: <code>P(collisione) = 1/32</code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 11,
      "title": "Indirizzo IPv4 unicast valido e instradabile in Internet",
      "topic": "rete",
      "question": "Gli indirizzi IP sono numeri interi di 32 bit, normalmente indicati nella notazione \"dotted decimal\", cioè con quattro numeri interi separati da un punto: X.Y.Z.W, con associata una \"network mask\" con la stessa notazione; ad esempio <code>128.10.0.18; 255.255.255.0</code>. Indicare quale dei seguenti indirizzi è un indirizzo unicast valido instradabile in Internet:",
      "options": [
        {
          "origKey": "a",
          "text": "<code>20.144.11.132; 255.255.255.128</code>"
        },
        {
          "origKey": "b",
          "text": "<code>10.144.11.132; 255.255.255.128</code>"
        },
        {
          "origKey": "c",
          "text": "<code>130.192.1.0; 255.255.255.0</code>"
        },
        {
          "origKey": "d",
          "text": "<code>224.144.11.132; 255.255.255.0</code>"
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 791, RFC 1918, RFC 4632",
      "explanation": [
        "Un indirizzo IPv4 è diviso in <strong>NetID</strong> (identifica la sottorete) e <strong>HostID</strong> (identifica la singola interfaccia). La Subnet Mask ha tutti bit a 1 in corrispondenza del NetID e tutti bit a 0 in corrispondenza dell'HostID.",
        "Nel caso ({{opt:a}}), <code>255.255.255.128</code> equivale a <code>/25</code> (infatti <code>128<sub>10</sub> = 10000000<sub>2</sub></code>), quindi i primi 25 bit sono NetID e gli ultimi 7 bit sono HostID. L'ultimo ottetto è <code>132<sub>10</sub> = 10000100<sub>2</sub></code>: i 7 bit di HostID valgono <code>0000100<sub>2</sub> = 4</code>. Non essendo né tutti 0 (indirizzo di rete <code>.128</code>) né tutti 1 (broadcast <code>.255</code>), ed essendo <code>20.x.x.x</code> un blocco pubblico, è un <strong>indirizzo unicast pubblico valido</strong>."
      ],
      "wrongReasons": "({{opt:b}}): <code>10.x.x.x</code> fa parte del blocco di <strong>indirizzi privati</strong> (<code>10.0.0.0/8</code>, RFC 1918), non instradabili sulla Internet pubblica senza NAT. ({{opt:c}}): Con mask <code>/24</code>, <code>130.192.1.0</code> ha tutti i bit dell'HostID a 0 ed è l'<strong>indirizzo di rete</strong>. ({{opt:d}}): <code>224.x.x.x</code> rientra nel blocco <code>224.0.0.0/4</code>, riservato agli indirizzi <strong>multicast</strong>.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 12,
      "title": "Codici a ridondanza ciclica (CRC)",
      "topic": "collegamento",
      "question": "I codici a ridondanza ciclica (CRC) impiegati ad esempio come Checksum per Ethernet:",
      "options": [
        {
          "origKey": "a",
          "text": "Sono un caso particolare dei bit di parità, si ottengono ponendo i dati in una matrice e calcolando la parità sia per riga che per colonna."
        },
        {
          "origKey": "b",
          "text": "Sono codici che consentono la rilevazione di un buon numero di errori, purché non si presentino in burst, ad esempio, di più di 4 bit errati consecutivi per CRC a 32 bit."
        },
        {
          "origKey": "c",
          "text": "Sono i bit ottenuti come resto di un'operazione di divisione in binario, ogni codice CRC è caratterizzato dalla divisione per uno specifico polinomio generatore."
        },
        {
          "origKey": "d",
          "text": "Sono quei bit tali per cui la loro moltiplicazione in binario per il polinomio generatore ritorna i dati originali; ogni codice CRC è caratterizzato dalla moltiplicazione per uno specifico polinomio generatore."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.3",
      "explanation": [
        "A Livello 2 (es. Ethernet) si aggiungono bit ridondanti (checksum / CRC) per rilevare eventuali errori introdotti dal canale.",
        "Nel <strong>CRC</strong>, la sequenza di bit della trama viene vista come un polinomio <em>M(x)</em>, moltiplicata per <em>x<sup>k</sup></em> (dove <em>k</em> è il numero di bit di controllo, es. <em>k = 32</em> in Ethernet) e divisa in aritmetica binaria (campo di Galois <em>GF(2)</em>) per un <strong>polinomio generatore</strong> <em>G(x)</em> noto:<br><code>M(x) · x<sup>k</sup> = Q(x) · G(x) + R(x)</code><br>Il <strong>resto R(x)</strong> viene inserito nel campo FCS/CRC della trama. Il ricevitore ripete la divisione e, se ottiene resto diverso da zero, scarta la trama."
      ],
      "wrongReasons": "La parità a matrice ({{opt:a}}) è un metodo diverso e più debole; il CRC-32 rileva burst fino a 32 bit consecutivi (non solo 4, {{opt:b}}); si ottiene tramite <em>divisione</em> (resto), non moltiplicazione ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 13,
      "title": "Cosa sono i Cookies",
      "topic": "trasporto_app",
      "question": "I \"Cookies\" sono un modo per mantenere uno \"stato\" relativo ad un utente nei servizi Web. In cosa consistono?",
      "options": [
        {
          "origKey": "a",
          "text": "Codici identificativi generati dal servizio Web a ogni accesso e inviati ai browser che li memorizzano localmente. Il servizio Web associa questi codici a una base dati temporanea che contiene informazioni relative alla sessione di navigazione e viene cancellata alla fine della sessione stessa."
        },
        {
          "origKey": "b",
          "text": "Piccoli file identificativi generati dal servizio Web e inviati ai browser, che li memorizzano localmente e li usano nelle sessioni successive per migliorare l'esperienza di navigazione sul sito da parte dell'utente. Questi file contengono informazioni relative alla struttura del servizio Web e alle preferenze dell'utente, consentendo al browser di effettuare alcune operazioni in autonomia. Una volta generati dal servizio Web questi file non vengono più trasmessi al browser e, se cancellati, devono essere rigenerati."
        },
        {
          "origKey": "c",
          "text": "Piccoli file identificativi generati dal servizio Web e inviati ai browser, che li memorizzano localmente e li inviano al servizio Web ad ogni eventuale richiesta futura. Questi file sono associati a una base dati mantenuta dal gestore dei servizi Web e memorizzano informazioni relative all'utente (preferenze, azioni incomplete, ...)."
        },
        {
          "origKey": "d",
          "text": "Piccoli file identificativi generati dal servizio Web e inviati ai browser, che li memorizzano localmente e li inviano al servizio Web ad ogni eventuale richiesta futura. Questi file sono associati a una base dati mantenuta dall'operatore della rete e memorizzano informazioni relative all'utente (preferenze, azioni incomplete, ...) e al servizio Web associato, per velocizzare navigazioni future."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 6265",
      "explanation": [
        "Il protocollo <strong>HTTP</strong> è <em>stateless</em> (senza stato): il server non ricorda le richieste precedenti di un utente.",
        "Per mantenere uno \"stato\" applicativo (carrello, login, preferenze), il server Web genera un piccolo file/stringa identificativa (<strong>cookie</strong>) e lo invia al browser nella risposta HTTP (<code>Set-Cookie</code>). Il browser lo salva localmente e lo allega automaticamente a tutte le richieste successive verso quel sito (<code>Cookie</code>), permettendo al server di collegare l'utente ai suoi dati memorizzati nella base dati del gestore del servizio."
      ],
      "wrongReasons": "Possono essere persistenti con data di scadenza oltre la singola sessione ({{opt:a}}), vengono ritrasmessi al server ad ogni visita futura ({{opt:b}}) e la base dati appartiene al <em>gestore del servizio Web</em>, non all'operatore di rete/ISP ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 14,
      "title": "Caratteristiche sintattiche dei protocolli applicativi HTTP e SMTP",
      "topic": "trasporto_app",
      "question": "I più diffusi protocolli di livello applicativo di Internet come HTTP, SMTP e simili hanno le seguenti caratteristiche:",
      "options": [
        {
          "origKey": "a",
          "text": "Sono basati su campi numerici binari (come gli indirizzi IP) di dimensione fissa identificati da un \"tag\" e separati gli uni dagli altri dalla coppia di caratteri CR LF."
        },
        {
          "origKey": "b",
          "text": "Sono basati su campi testuali di dimensione variabile identificati da un \"tag\" e separati gli uni dagli altri dalla coppia di caratteri CR LF."
        },
        {
          "origKey": "c",
          "text": "Sono basati su campi testuali di dimensione fissa identificati da un \"tag\" e separati gli uni dagli altri dalla coppia di caratteri CR LF."
        },
        {
          "origKey": "d",
          "text": "Sono basati su campi numerici di dimensione fissa il cui significato dipende dalla loro posizione rispetto all'inizio dell'header del messaggio."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 9112, RFC 5321",
      "explanation": [
        "I protocolli applicativi classici come <strong>HTTP</strong> (1.0/1.1) e <strong>SMTP</strong> usano messaggi leggibili in formato <strong>testuale (ASCII) a lunghezza variabile</strong>. Ogni riga di intestazione ha la struttura <code>Tag: Valore</code> ed è terminata dalla coppia di caratteri di controllo <strong>CR LF</strong> (<em>Carriage Return + Line Feed</em>), mentre una riga vuota (<code>CRLF</code>) separa l'intestazione dal corpo (<em>payload</em>)."
      ],
      "wrongReasons": "Non sono binari a dimensione fissa come gli header IP ({{opt:a}}, {{opt:d}}) e i campi testuali non hanno dimensione fissa ({{opt:c}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 15,
      "title": "Condizioni di quasi-idealità per CSMA/CD",
      "topic": "collegamento",
      "question": "I protocolli di accesso Carrier Sense Multiple Access with Collision Detection (CSMA/CD) hanno un comportamento quasi ideale (efficienza unitaria) nelle seguenti condizioni:",
      "options": [
        {
          "origKey": "a",
          "text": "Reti di dimensioni (spaziali) limitate, con velocità di trasmissione relativamente lenta e dimensione delle trame grandi."
        },
        {
          "origKey": "b",
          "text": "Reti di dimensioni (spaziali) medio grandi, con velocità di trasmissione relativamente lenta e dimensione delle trame molto piccole, non più di 64 byte."
        },
        {
          "origKey": "c",
          "text": "Reti con un rapporto T<sub>tx</sub>/T<sub>p</sub> circa uguale a 1, dove T<sub>tx</sub> indica il tempo medio di trasmissione di una trama e T<sub>p</sub> il tempo di propagazione del segnale elettromagnetico da un estremo all'altro della rete."
        },
        {
          "origKey": "d",
          "text": "Reti con un rapporto T<sub>tx</sub>/T<sub>p</sub> maggiore di 1, dove T<sub>tx</sub> indica il tempo medio di trasmissione di una trama e T<sub>p</sub> il tempo di propagazione del segnale elettromagnetico da un estremo all'altro della rete, purché tuttavia T<sub>tx</sub> non sia troppo grande perché indicherebbe una rete troppo lenta."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3",
      "explanation": [
        "L'efficienza di <strong>CSMA/CD</strong> è approssimativamente <code>1 − a</code> (o <code>1/(1 + 5a)</code>), dove <code>a = T<sub>p</sub> / T<sub>tx</sub></code> rappresenta il rapporto tra il tempo di propagazione <em>T<sub>p</sub></em> e il tempo di trasmissione della trama <em>T<sub>tx</sub></em>.",
        "Per avere efficienza quasi unitaria (<em>a → 0</em>), occorre che <em>T<sub>p</sub></em> sia molto piccolo (<strong>rete spazialmente piccola</strong>) e che <em>T<sub>tx</sub></em> sia molto grande (<strong>trame lunghe e velocità di trasmissione relativamente bassa</strong>). Con velocità altissime (1 Gbit/s e oltre), <em>T<sub>tx</sub></em> è crollato rendendo CSMA/CD inefficiente e portando all'Ethernet commutato full-duplex."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 16,
      "title": "Requisiti delle applicazioni e scelta del protocollo di trasporto",
      "topic": "trasporto_app",
      "question": "I servizi e le applicazioni su Internet hanno diversi requisiti di comunicazione. Quale di queste affermazioni è vera?",
      "options": [
        {
          "origKey": "a",
          "text": "Per funzionare bene in Internet le applicazioni devono adattare il proprio rate di trasmissione alle condizioni della rete, eventualmente riducendo la finestra di trasmissione per mantenere basso il ritardo end-to-end."
        },
        {
          "origKey": "b",
          "text": "Le applicazioni hanno requisiti molto variabili in termini di correttezza dei dati, ritardo end-to-end, temporizzazione e molto altro, e scelgono uno o più protocolli di livello trasporto (TCP, UDP e altri ancora) in modo da soddisfare le proprie esigenze."
        },
        {
          "origKey": "c",
          "text": "Per funzionare bene in Internet le applicazioni devono adattare i propri requisiti o al protocollo TCP, se hanno bisogno di affidabilità, oppure al protocollo UDP se non possono aprire una connessione."
        },
        {
          "origKey": "d",
          "text": "Le applicazioni hanno requisiti molto variabili in termini ritardo end-to-end, temporizzazione e molto altro, ma richiedono tutte la correttezza dei dati, per cui se non possono usare TCP a livello trasporto devono implementare il recupero dei dati persi sopra UDP."
        }
      ],
      "correctKey": "b",
      "refs": "Architettura TCP/IP",
      "explanation": [
        "Sopra il livello IP (che offre un solo servizio <em>best effort</em>) esistono diversi protocolli di trasporto (principalmente <strong>TCP</strong> e <strong>UDP</strong>). Applicazioni diverse hanno esigenze opposte: il trasferimento file o il Web non tollerano perdite di dati (e usano TCP), mentre lo streaming audio/video in tempo reale tollera qualche perdita ma non i ritardi dovuti alle ritrasmissioni (e preferisce UDP)."
      ],
      "wrongReasons": "Il controllo di congestione/finestra lo fa TCP, non le applicazioni ({{opt:a}}); la scelta dipende dai requisiti di affidabilità/ritardo dell'applicazione ({{opt:c}}); molte applicazioni real-time su UDP <em>non</em> recuperano i pacchetti persi ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 17,
      "title": "Funzionamento del comando ping",
      "topic": "rete",
      "question": "Il comando \"ping\" (o equivalenti applicativi sia testuali che grafici):",
      "options": [
        {
          "origKey": "a",
          "text": "È un comando basato sull'uso di messaggi ICMP (Internet Control Message Protocol), che consentono di stabilire se i diversi servizi esposti attraverso una interfaccia IP sono raggiungibili dai client."
        },
        {
          "origKey": "b",
          "text": "È un comando basato sull'uso di messaggi ICMP (Internet Control Message Protocol), che consentono di stabilire se una interfaccia IP è raggiungibile e verificare il percorso usato per raggiungerla."
        },
        {
          "origKey": "c",
          "text": "È un comando basato sull'uso di due messaggi ICMP (Internet Control Message Protocol), <code>echo_request</code> e <code>echo_reply</code>, che consentono di stabilire se un server è raggiungibile e calcolare il Round Trip Time (RTT) che verrà sperimentato dalle connessioni verso questo server."
        },
        {
          "origKey": "d",
          "text": "È un comando basato sull'uso di due messaggi ICMP (Internet Control Message Protocol), <code>echo_request</code> e <code>echo_reply</code>, che consentono di stabilire se una interfaccia IP è raggiungibile e calcolare il Round Trip Time a livello IP."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 792",
      "explanation": [
        "<strong>ICMP</strong> è un protocollo di segnalazione del Livello 3 (Rete) incapsulato direttamente nei datagrammi IP (<code>Protocol = 1</code>, senza usare TCP o UDP).",
        "Il comando <code>ping</code> invia un messaggio ICMP <strong>Echo Request</strong> (<code>Type = 8</code>) verso un indirizzo IP; se l'interfaccia destinataria è attiva e raggiungibile, risponde con un <strong>Echo Reply</strong> (<code>Type = 0</code>). Misurando il tempo trascorso tra invio e risposta, si ottiene l'RTT <strong>a livello IP</strong>."
      ],
      "wrongReasons": "Il <code>ping</code> verifica la raggiungibilità dell'<em>interfaccia IP</em> (Livello 3), non dei singoli servizi applicativi/porte ({{opt:a}}), né scopre il percorso router per router (compito di <code>traceroute</code>, {{opt:b}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 18,
      "title": "Cos'è il DNS e cosa sono i server autoritativi",
      "topic": "trasporto_app",
      "question": "Il DNS (Domain Name System):",
      "options": [
        {
          "origKey": "a",
          "text": "È una base dati distribuita che supporta la risoluzione dei nomi di dominio in indirizzi IP e altre funzioni correlate. I server in grado di tradurre sempre un FQDN (Fully Qualified Domain Name) sono chiamati server di competenza o autoritativi."
        },
        {
          "origKey": "b",
          "text": "È una funzione implementata dai router, in particolare dai default gateway, che consente al router di tradurre il nome di dominio nel corrispondente indirizzo IP e quindi di instradare correttamente l'informazione."
        },
        {
          "origKey": "c",
          "text": "È una base dati distribuita organizzata in modo gerarchico su tre livelli: Top Level Domain, Server Autoritativi o di Competenza, Server DNS locale. Supporta la risoluzione dei nomi di dominio in indirizzi IP e altre funzioni correlate."
        },
        {
          "origKey": "d",
          "text": "È una base dati distribuita, organizzata a partire da 13 server (server radice) che gestiscono i diversi TLD (Top Level Domain), che supporta la risoluzione dei nomi di dominio in indirizzi IP e altre funzioni correlate. I server TLD inoltrano le richieste ai server DNS locali che possiedono le informazioni sui nomi completi chiamati FQDN (Fully Qualified Domain Name)."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 1034, RFC 1035",
      "explanation": [
        "Il <strong>DNS</strong> è un gigantesco database distribuito organizzato ad albero che traduce i nomi mnemonici (come <code>web.unibs.it</code>, detto <strong>FQDN</strong>, <em>Fully Qualified Domain Name</em>) nei corrispondenti indirizzi IP.",
        "Alla base di questa gerarchia ci sono i <strong>server di competenza (o autoritativi)</strong>, che appartengono alle singole organizzazioni/domini e detengono i record ufficiali e definitivi per tradurre gli FQDN di loro competenza."
      ],
      "wrongReasons": "Il DNS non è una funzione dei router ({{opt:b}}); la gerarchia ad albero parte dai <strong>Server Radice (Root)</strong>, poi TLD, poi Autoritativi, mentre il DNS locale è esterno all'albero ({{opt:c}}, {{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 19,
      "title": "Il modello Client / Server su Internet",
      "topic": "trasporto_app",
      "question": "Il modello di servizio di telecomunicazione client / server, tipico di Internet, prevede:",
      "options": [
        {
          "origKey": "a",
          "text": "Che il server (fornitore del servizio) sia un processo sempre attivo e sempre in ascolto di possibili richieste provenienti dai client su una specifica porta dell'opportuno livello di trasporto."
        },
        {
          "origKey": "b",
          "text": "Che il server (fornitore del servizio) sia collocato in un opportuno data-center sempre attivo e a disposizione, con una elevata garanzia di servizio."
        },
        {
          "origKey": "c",
          "text": "Che il server (fornitore del servizio) sia un sistema disponibile sul web e in grado di collegarsi ai client quando questi ne fanno richiesta, ovunque essi siano."
        },
        {
          "origKey": "d",
          "text": "Che il server (fornitore del servizio) sia un processo sempre attivo e sempre in ascolto su un indirizzo IP predefinito e conosciuto dai client."
        }
      ],
      "correctKey": "a",
      "refs": "Architettura delle applicazioni di rete",
      "explanation": [
        "Nel paradigma <strong>Client/Server</strong>, il <strong>client</strong> è il programma che prende l'iniziativa avviando la comunicazione, mentre il <strong>server</strong> è un processo sempre attivo che resta in ascolto su una <strong>porta</strong> ben nota del livello trasporto (es. porta <code>80</code> per il Web) per ricevere e soddisfare le richieste."
      ],
      "wrongReasons": "Un server non deve necessariamente trovarsi in un data-center ({{opt:b}}), non è lui a collegarsi ai client su richiesta ({{opt:c}}) e l'identificazione del processo avviene tramite la <em>porta di trasporto</em> associata all'IP ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 20,
      "title": "Numero di livelli in un'architettura protocollare",
      "topic": "fondamenti",
      "question": "Il numero di livelli in una architettura protocollare:",
      "options": [
        {
          "origKey": "a",
          "text": "Dipende dalle scelte architetturali di chi ha progettato l'architettura."
        },
        {
          "origKey": "b",
          "text": "È fisso e pari a 5 come definito da Internet."
        },
        {
          "origKey": "c",
          "text": "Varia tra 3 e 7 a seconda che si usi o meno una rete a commutazione di pacchetto."
        },
        {
          "origKey": "d",
          "text": "È fisso e pari a 7 come definito dal modello ISO/OSI."
        }
      ],
      "correctKey": "a",
      "refs": "Architetture protocollari",
      "explanation": [
        "Un'architettura protocollare è una suddivisione logica in moduli indipendenti (livelli/strati) che cooperano per offrire servizi di comunicazione. Non esiste un numero universalmente imposto dalla fisica: chi progetta l'architettura decide come suddividere le funzioni (ad esempio il modello teorico ISO/OSI ha <strong>7 livelli</strong>, mentre lo stack TCP/IP ne ha <strong>5</strong> o <strong>4</strong> a seconda di come si raggruppano gli strati bassi)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 21,
      "title": "Funzionamento del protocollo ARP",
      "topic": "collegamento",
      "question": "Il protocollo ARP (Address Resolution Protocol) serve a tradurre gli indirizzi IP in indirizzi MAC (o \"Ethernet\"). Quale delle seguenti affermazioni è corretta?",
      "options": [
        {
          "origKey": "a",
          "text": "È un protocollo broadcast and select, in cui l'host che vuole risolvere un indirizzo IP manda la richiesta in broadcast e l'host che riconosce il proprio indirizzo IP risponde nuovamente in broadcast."
        },
        {
          "origKey": "b",
          "text": "È un protocollo broadcast and select, in cui l'host che vuole risolvere un indirizzo IP manda la richiesta in broadcast e l'host che riconosce il proprio indirizzo IP risponde in unicast indicando il proprio indirizzo MAC."
        },
        {
          "origKey": "c",
          "text": "È un protocollo per reti locali, in cui l'host che vuole risolvere un indirizzo IP manda la richiesta al router di default che risponde con la mappatura corretta."
        },
        {
          "origKey": "d",
          "text": "È un protocollo di Internet che serve a tradurre un indirizzo IP, che è logico, in un indirizzo MAC per poter consegnare il datagramma al destinatario finale del datagramma."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 826",
      "explanation": [
        "Per incapsulare un datagramma IP in una trama Ethernet (Livello 2) serve l'indirizzo MAC del nodo successivo. L'host sorgente invia una trama <strong>ARP Request in broadcast</strong> (<code>FF:FF:FF:FF:FF:FF</code>) a tutti i nodi della sottorete locale (\"Chi ha l'IP X?\"); tutti la ricevono, ma solo chi possiede quell'IP risponde con una <strong>ARP Reply in unicast</strong> contenente il proprio MAC."
      ],
      "wrongReasons": "La risposta è unicast, non broadcast ({{opt:a}}); non si chiede al router di default ({{opt:c}}); ARP risolve il MAC del <em>next-hop</em> locale, non necessariamente del destinatario finale su Internet ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 22,
      "title": "Caratteristiche del protocollo FTP",
      "topic": "trasporto_app",
      "question": "Il protocollo FTP (File Transfer Protocol):",
      "options": [
        {
          "origKey": "a",
          "text": "È un protocollo di livello applicativo dedicato al trasferimento dei file, a livello trasporto usa UDP per trasmettere i comandi dal client al server e TCP per trasferire i file, in modo da velocizzare i comandi, ma trasferire i file in modo affidabile."
        },
        {
          "origKey": "b",
          "text": "È uno dei primi protocolli di livello applicativo definiti nella pila protocollare TCP/IP, usa TCP come protocollo di livello trasporto e consente di inviare file dal server al client e viceversa."
        },
        {
          "origKey": "c",
          "text": "È un protocollo di livello trasporto alternativo a TCP definito recentemente per ottimizzare il trasporto di grossi file con HTTP/2."
        },
        {
          "origKey": "d",
          "text": "È uno dei primi protocolli di livello applicativo definiti nella pila protocollare TCP/IP, usa TCP come protocollo di livello trasporto, ma consente di trasferire file solamente dal server al client (download), per cui se un host A desidera trasferire un file verso un host B deve necessariamente installare un server FTP."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 959",
      "explanation": [
        "<strong>FTP</strong> (<em>File Transfer Protocol</em>) è un protocollo applicativo storico progettato per trasferire file in modo affidabile tra client e server (sia in download dal server al client sia in upload dal client al server). Poiché il trasferimento file non tollera perdite di byte, si appoggia interamente a <strong>TCP</strong>."
      ],
      "wrongReasons": "Non usa UDP per i comandi ({{opt:a}}), non è un protocollo di trasporto moderno ({{opt:c}}) e consente il trasferimento in <em>entrambe</em> le direzioni ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 23,
      "title": "Connessioni TCP persistenti in HTTP/1.0 e 1.1",
      "topic": "trasporto_app",
      "question": "Il protocollo HTTP, nelle sue versioni 1.0 e 1.1, può usare al livello trasporto connessioni TCP persistenti. Questo significa che:",
      "options": [
        {
          "origKey": "a",
          "text": "Viene aperta una connessione TCP fra il client e il server per ogni oggetto che il client deve scaricare."
        },
        {
          "origKey": "b",
          "text": "Sulla stessa connessione TCP tra il client e il server vengono trasmessi in sequenza uno o più oggetti che vanno a comporre la pagina Web; il client richiede la trasmissione di ciascun oggetto nella sequenza che ritiene più opportuna, anche in pipelining."
        },
        {
          "origKey": "c",
          "text": "Viene aperta una connessione TCP fra il client e il server per scaricare il primo oggetto della pagina Web. Il protocollo HTTP poi valuta se utilizzare la stessa connessione TCP per scaricare eventuali altri oggetti o se utilizzare una connessione TCP per oggetto da scaricare ai fini di ottimizzare l'utilizzo della banda disponibile in base all'RTT misurato per il primo oggetto."
        },
        {
          "origKey": "d",
          "text": "Viene aperta una prima connessione TCP, scaricando il primo oggetto della pagina Web. Se questo trasferimento ha successo, viene tenuta aperta questa connessione TCP inviando la richiesta di un nuovo oggetto, ma viene aperta una seconda connessione TCP per trasferire un altro oggetto in parallelo, se entrambi questi trasferimenti hanno successo viene aperta una terza connessione, e così via, fino a quando la pagina web è composta per intero."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 9112",
      "explanation": [
        "Una pagina Web è composta da un file HTML base più molti oggetti (immagini, fogli di stile, ecc.). Con le connessioni <strong>non persistenti</strong> si apre e chiude una connessione TCP per ogni singolo oggetto (pagando ogni volta handshake e Slow Start).",
        "Con le connessioni <strong>persistenti</strong> (default in HTTP/1.1), dopo aver inviato il primo oggetto il server lascia aperta la connessione TCP, permettendo al client di richiedere e scaricare in sequenza tutti gli altri oggetti sullo stesso canale (eventualmente inviando più richieste di seguito senza aspettare ogni singola risposta, tecnica detta <strong>pipelining</strong>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 24,
      "title": "Il protocollo SMTP",
      "topic": "trasporto_app",
      "question": "Il protocollo SMTP (Simple Mail Transfer Protocol):",
      "options": [
        {
          "origKey": "a",
          "text": "È il protocollo usato per inviare messaggi di posta elettronica."
        },
        {
          "origKey": "b",
          "text": "È il protocollo usato dai server di posta elettronica, mentre i client usano POP3 oppure IMAP."
        },
        {
          "origKey": "c",
          "text": "È un protocollo obsoleto di invio della posta elettronica, sostituito da MMTP (Mime Mail Transfer Protocol) che consente l'invio di messaggi con formato arbitrario."
        },
        {
          "origKey": "d",
          "text": "È un protocollo per l'invio via posta elettronica di semplici messaggi testuali tipo chat, mentre per inviare messaggi complessi bisogna usare IMAP."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 5321",
      "explanation": [
        "Nel sistema di posta elettronica di Internet, <strong>SMTP</strong> (<em>Simple Mail Transfer Protocol</em>) è il protocollo standard utilizzato sia dal client di posta (User Agent) per inviare l'email al proprio server di posta, sia dai server di posta per inoltrare i messaggi tra loro fino al server del destinatario. Per leggere/scaricare la posta dal server si usano invece <strong>POP3</strong> (RFC 1939) o <strong>IMAP</strong> (RFC 9051)."
      ],
      "wrongReasons": "Anche i client usano SMTP per inviare ({{opt:b}}); MMTP non esiste, gli allegati usano le estensioni MIME sopra SMTP ({{opt:c}}); SMTP trasporta qualsiasi email, inclusi allegati multimediali tramite MIME ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 25,
      "title": "Andamento a regime della finestra di congestione TCP (con 3 ACK duplicati)",
      "topic": "trasporto_app",
      "question": "Il protocollo TCP effettua controllo di congestione modificando le dimensioni della finestra di trasmissione. Supponendo che una connessione TCP sia \"a regime\", quindi non nelle fasi iniziali della trasmissione, e che la perdita di segmenti sia un evento sporadico tale da non innescare dei timeout (scadenza RTO), quale andamento della dimensione della finestra di trasmissione in funzione del tempo è quello corretto?",
      "options": [
        {
          "origKey": "a",
          "text": "A \"dente di sega\" con una crescita esponenziale nel tempo durante le fasi di funzionamento senza perdite per trasmettere più velocemente, e con il dimezzamento della finestra quando vengono ricevuti 3 ACK duplicati (perdita di un segmento)."
        },
        {
          "origKey": "b",
          "text": "A \"dente di sega\" con una crescita lineare nel tempo durante le fasi di funzionamento senza perdite, e con il dimezzamento della finestra quando vengono ricevuti 3 ACK duplicati (perdita di un segmento)."
        },
        {
          "origKey": "c",
          "text": "A \"impulsi\" con una crescita esponenziale nel tempo durante le fasi di funzionamento senza perdite, e quando vengono ricevuti 3 ACK duplicati (perdita di un segmento) si ritrasmette il segmento perso e si ricomincia a trasmettere con finestra pari a 1 MSS (Maximum Segment Size)."
        },
        {
          "origKey": "d",
          "text": "A \"impulsi\" con una crescita esponenziale nel tempo durante le fasi di funzionamento senza perdite, e quando vengono ricevuti 3 ACK duplicati (perdita di un segmento) si ritrasmette il segmento perso, il trasmettitore si ferma per un RTT per lasciare che la rete si decongestioni e poi ricomincia a trasmettere con finestra pari alla finestra che aveva nel momento in cui ha ricevuto i 3 ACK duplicati, mantenendo in questo modo il throughput elevato."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 5681",
      "explanation": [
        "Quando TCP opera \"a regime\" (nella fase di <strong>Congestion Avoidance</strong>), aumenta prudenzialmente la propria finestra di congestione (<em>CWND</em>) in modo <strong>lineare</strong> (di circa <code>1 MSS</code> per ogni RTT).",
        "Se avviene una perdita lieve segnalata dalla ricezione di <strong>3 ACK duplicati</strong> (meccanismo di <strong>Fast Retransmit / Fast Recovery</strong>), TCP non crolla a 1 MSS come farebbe allo scadere di un timeout, ma <strong>dimezza la finestra</strong> (<code>SSTHR = CWND/2</code>) e riprende a crescere linearmente. Ripetendo questo ciclo (<strong>AIMD</strong>, <em>Additive Increase Multiplicative Decrease</em>) si ottiene il classico grafico a <strong>\"dente di sega\"</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 26,
      "title": "Come TCP combina controllo di congestione e controllo di flusso",
      "topic": "trasporto_app",
      "question": "Il protocollo TCP effettua controllo di congestione e di flusso agendo sulle dimensioni della finestra di trasmissione. In che modo?",
      "options": [
        {
          "origKey": "a",
          "text": "Evolve la propria finestra di congestione CWND secondo la ricezione degli ACK, e ricava la finestra di ricezione RWND annunciata negli ACK. Pone la finestra di trasmissione pari a min(CWND, RWND)."
        },
        {
          "origKey": "b",
          "text": "Evolve la propria finestra di ricezione RWND secondo la ricezione degli ACK, e ricava la finestra di congestione CWND annunciata negli ACK. Pone la finestra di trasmissione pari a max(CWND, RWND)."
        },
        {
          "origKey": "c",
          "text": "Evolve la propria finestra di ricezione RWND secondo la ricezione degli ACK, e ricava la finestra di congestione CWND annunciata negli ACK. Pone la finestra di trasmissione pari a min(CWND, RWND)."
        },
        {
          "origKey": "d",
          "text": "Evolve la propria finestra di congestione CWND secondo la ricezione degli ACK, e ricava la finestra di ricezione RWND annunciata negli ACK. Pone la finestra di trasmissione pari a max(CWND, RWND)."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 9293, RFC 5681",
      "explanation": [
        "Il trasmettitore TCP deve rispettare due limiti contemporaneamente:<br>1) <strong>Non saturare la rete</strong> → calcola localmente la <em>Congestion Window</em> (<code>CWND</code>) in base agli ACK e alle perdite.<br>2) <strong>Non saturare la memoria del destinatario</strong> → legge la <em>Receiver Window</em> (<code>RWND</code>) scritta dal ricevitore dentro gli ACK.",
        "Per garantire entrambe le condizioni, la finestra effettiva di trasmissione viene impostata al <strong>valore minimo</strong> tra le due: <code>TXWND = min(CWND, RWND)</code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 27,
      "title": "Controllo di flusso in TCP",
      "topic": "trasporto_app",
      "question": "Il protocollo TCP effettua controllo di flusso:",
      "options": [
        {
          "origKey": "a",
          "text": "Evitando che la velocità di trasmissione superi la capacità disponibile in rete."
        },
        {
          "origKey": "b",
          "text": "In modo cooperativo tra trasmettitore e ricevitore, garantendo che la finestra di trasmissione non superi mai la finestra di ricezione annunciata dal ricevitore negli ACK."
        },
        {
          "origKey": "c",
          "text": "Al ricevitore, mandando ACK che inibiscono la trasmissione di nuovi segmenti."
        },
        {
          "origKey": "d",
          "text": "Attraverso opportuni meccanismi di segnalazione tra il livello rete (IP) e il livello trasporto (TCP stesso)."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 9293",
      "explanation": [
        "Il <strong>controllo di flusso</strong> è un meccanismo <em>end-to-end</em> tra trasmettitore e ricevitore volto a evitare che un mittente veloce riempia eccessivamente il buffer di ricezione del destinatario. Il ricevitore collabora scrivendo in ogni ACK lo spazio ancora libero nel proprio buffer (<em>RWND</em>), e il trasmettitore si impegna a non avere in transito più byte di quelli indicati da <em>RWND</em>."
      ],
      "wrongReasons": "Evitare di saturare la rete è il controllo di <em>congestione</em> ({{opt:a}}); il ricevitore non manda ACK per inibire, ma aggiorna il valore di <em>RWND</em> ({{opt:c}}); IP non segnala nulla a TCP ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 28,
      "title": "Architettura interna di un router",
      "topic": "rete",
      "question": "In generale l'architettura di un router prevede la presenza di:",
      "options": [
        {
          "origKey": "a",
          "text": "Schede di Ingresso e Uscita (Input/Output Port) che realizzano il forwarding; un \"routing engine\" che calcola la rotta per la destinazione quando si riceve un datagramma con un indirizzo IP mai visto prima."
        },
        {
          "origKey": "b",
          "text": "Schede di Ingresso e Uscita (Input/Output Port) che realizzano il forwarding; un \"routing engine\" che inoltra i pacchetti che non sa instradare verso il default gateway."
        },
        {
          "origKey": "c",
          "text": "Schede di Ingresso e Uscita (Input/Output Port) che si occupano di decapsulare e incapsulare i datagrammi IP nelle trame di livello 2; un \"forwarding engine\" che in base agli indirizzi IP di sorgente e destinazione decide la porta di uscita del datagramma e il suo eventuale Next-Hop."
        },
        {
          "origKey": "d",
          "text": "Schede di Ingresso e Uscita (Input/Output Port) che si occupano di decapsulare e incapsulare i datagrammi IP nelle trame di livello 2; una \"switching fabric\" che in base all'indirizzo IP di destinazione decide la porta di uscita del datagramma e il suo eventuale Next-Hop."
        }
      ],
      "correctKey": "c",
      "refs": "Architettura dei router",
      "explanation": [
        "Un router interconnette sottoreti diverse (spesso con tecnologie di Livello 2 differenti). Quando una trama entra da una porta di ingresso, viene <strong>decapsulata</strong> (rimuovendo l'header L2) per estrarre il datagramma IP. Il <strong>forwarding engine</strong> consulta la tabella di instradamento (tipicamente in base all'indirizzo IP di destinazione, o anche sorgente nel policy/source routing) per decidere su quale porta di uscita e verso quale <strong>Next-Hop</strong> inoltrare il pacchetto, che viene poi re-incapsulato nella nuova trama L2 della porta di uscita."
      ],
      "wrongReasons": "Il <em>routing engine</em> calcola le tabelle in background tramite i protocolli di routing, non al volo per ogni pacchetto ignoto ({{opt:a}}, {{opt:b}}); la <em>switching fabric</em> ({{opt:d}}) è solo la matrice fisica che sposta il pacchetto dall'ingresso all'uscita, non prende la decisione di instradamento.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 29,
      "title": "Condizione sullo spazio di numerazione nei protocolli a finestra",
      "topic": "trasporto_app",
      "question": "In un protocollo a finestra le PDU devono essere numerate per poterle riconoscere e ritrasmettere in caso di perdita o errori. Dette N, W<sub>T</sub> e W<sub>R</sub> le dimensioni dello spazio di numerazione e delle finestre di trasmissione e ricezione rispettivamente, quale delle seguenti condizioni è necessaria per il corretto funzionamento del protocollo?",
      "options": [
        {
          "origKey": "a",
          "text": "N > W<sub>T</sub>"
        },
        {
          "origKey": "b",
          "text": "N ≥ (W<sub>T</sub> + W<sub>R</sub>)"
        },
        {
          "origKey": "c",
          "text": "N > W<sub>R</sub>"
        },
        {
          "origKey": "d",
          "text": "N ≤ (W<sub>T</sub> + W<sub>R</sub>)"
        }
      ],
      "correctKey": "b",
      "refs": "Teoria ARQ / Tanenbaum",
      "explanation": [
        "Nei protocolli a finestra scorrevole (<em>Sliding Window</em> con ripetizione selettiva), i numeri di sequenza delle PDU sono ciclici (vanno da <code>0</code> a <code>N − 1</code>, per un totale di <em>N</em> numeri).",
        "Se tutti gli ACK di una finestra vengono persi e il trasmettitore ritrasmette, il ricevitore (che ha già fatto scorrere avanti la propria finestra <em>W<sub>R</sub></em>) non deve confondere le vecchie PDU ritrasmesse con nuove PDU del ciclo successivo. Affinché le finestre <em>W<sub>T</sub></em> e <em>W<sub>R</sub></em> non si sovrappongano mai nello spazio dei numeri di sequenza, deve valere: <code>N ≥ W<sub>T</sub> + W<sub>R</sub></code> (ad esempio, per Stop &amp; Wait <em>W<sub>T</sub> = 1, W<sub>R</sub> = 1 ⇒ N ≥ 2</em>, protocollo a bit alternato)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 30,
      "title": "Efficienza di un protocollo di trasporto a finestra",
      "topic": "trasporto_app",
      "question": "In un protocollo di trasporto affidabile con una finestra di trasmissione di N PDU, detta L la lunghezza in bit della PDU, C la capacità della rete in bit/s e RTT il Round Trip Time in secondi, l'efficienza del protocollo è:",
      "options": [
        {
          "origKey": "a",
          "text": "(N × L / C) / RTT se N × L / C < RTT, altrimenti 1."
        },
        {
          "origKey": "b",
          "text": "(N × L / C) / RTT se L / C < RTT, altrimenti 1."
        },
        {
          "origKey": "c",
          "text": "(N × L / C) / [RTT + (L / C)] se N × L / C < RTT, altrimenti 1."
        },
        {
          "origKey": "d",
          "text": "N × L / C se N × L / C < RTT, altrimenti L / C."
        }
      ],
      "correctKey": "a",
      "refs": "Analisi prestazionale dei protocolli a finestra",
      "explanation": [
        "Il tempo necessario a trasmettere fisicamente una singola PDU lunga <em>L</em> bit su un canale di capacità <em>C</em> bit/s è <code>T<sub>tx</sub> = L/C</code>. Con una finestra di <em>N</em> PDU, il trasmettitore può inviare dati ininterrottamente per un tempo pari a <code>N · (L/C)</code> prima di doversi fermare in attesa del primo ACK, che impiega un tempo <em>RTT</em> per tornare indietro.",
        "L'efficienza η (frazione di tempo in cui il canale è effettivamente utilizzato) è quindi:<br><code>η = (N · L / C) / RTT</code><br>Se <code>N · (L/C) ≥ RTT</code>, il primo ACK arriva prima che il trasmettitore abbia finito di svuotare la finestra: il trasmettitore non si ferma mai e l'efficienza raggiunge il massimo possibile, pari a <strong>1 (100%)</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 31,
      "title": "Record DNS di tipo A",
      "topic": "trasporto_app",
      "question": "In un Record di tipo A del DNS (Domain Name System):",
      "options": [
        {
          "origKey": "a",
          "text": "Il campo name è il nome dell'host e il campo value è il suo indirizzo IP."
        },
        {
          "origKey": "b",
          "text": "Il campo name è il nome alias dell'host e il campo value è il nome autentico o 'canonico'."
        },
        {
          "origKey": "c",
          "text": "Il campo name è il nome dell'host e il campo value è il tempo per cui il suo indirizzo IP non cambierà di sicuro."
        },
        {
          "origKey": "d",
          "text": "Il campo name è il nome del server DNS di competenza e il campo value è il nome dell'host target."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 1035",
      "explanation": [
        "I record del database DNS hanno la struttura <code>(name, value, type, ttl)</code>. Il <strong>Record di tipo A</strong> (<em>Address</em>) fornisce la traduzione diretta fondamentale: associa al nome canonico di un host (<code>name</code>, es. <code>web.unibs.it</code>) il suo indirizzo IPv4 (<code>value</code>)."
      ],
      "wrongReasons": "La ({{opt:b}}) descrive il record <code>CNAME</code>, la ({{opt:c}}) è inventata e la ({{opt:d}}) descrive il record <code>NS</code>.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 32,
      "title": "Cos'è il Dominio di Broadcast in Ethernet",
      "topic": "collegamento",
      "question": "In una rete Ethernet, quale porzione di rete rappresenta il Dominio di Broadcast?",
      "options": [
        {
          "origKey": "a",
          "text": "Quella a cui sono fisicamente collegati (tramite cavo o altro link fisico, oppure hub di livello 1) dei dispositivi di comunicazione in modo da avere una comunicazione diretta da tutti a tutti con l'invio di una singola trama."
        },
        {
          "origKey": "b",
          "text": "Quella in cui può essere inviata una trama senza usare l'ausilio di uno switch."
        },
        {
          "origKey": "c",
          "text": "Quella in cui può essere inviata una trama di livello 2 in broadcast con la garanzia che venga ricevuta da tutte le stazioni, salvo errori di trasmissione o perdita della trama in un dispositivo attivo (switch, hub, bridge, ecc)."
        },
        {
          "origKey": "d",
          "text": "Quella in cui possono venire risolte eventuali collisioni."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.1D / IEEE 802.3",
      "explanation": [
        "Il <strong>Dominio di Broadcast</strong> è l'intera porzione di rete locale raggiunta da una trama L2 avente come destinazione l'indirizzo broadcast (<code>FF:FF:FF:FF:FF:FF</code>). Gli <strong>switch</strong> (e gli hub) inoltrano le trame broadcast su tutte le loro porte, quindi tutti i dispositivi collegati a uno switch (o a più switch in cascata) appartengono allo stesso dominio di broadcast. Solo un <strong>router</strong> (Livello 3) blocca il broadcast di Livello 2."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 33,
      "title": "Ruoli nell'architettura Client / Server",
      "topic": "trasporto_app",
      "question": "L'architettura di servizio dominante in Internet è l'architettura Client/Server. In questa architettura:",
      "options": [
        {
          "origKey": "a",
          "text": "Il processo Client richiede al DNS di iniziare la comunicazione; il processo Server deve essere registrato nel sistema DNS."
        },
        {
          "origKey": "b",
          "text": "Il processo Client può iniziare la comunicazione solamente se il processo Server ha garantito l'accesso alla risorsa (URL) richiesta."
        },
        {
          "origKey": "c",
          "text": "Il processo Client inizia la comunicazione; il processo Server deve risiedere in un Data Center."
        },
        {
          "origKey": "d",
          "text": "Il processo Client inizia la comunicazione; il processo Server deve sempre essere in ascolto e risponde alla richiesta."
        }
      ],
      "correctKey": "d",
      "refs": "Architettura delle applicazioni di rete",
      "explanation": [
        "Per definizione architetturale, in una comunicazione tra due processi su Internet, il <strong>Client</strong> è il programma che avvia attivamente il contatto inviando la prima richiesta, mentre il <strong>Server</strong> è il programma sempre attivo e raggiungibile che attende le richieste e risponde fornendo il servizio."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 34,
      "title": "Durata della cache ARP",
      "topic": "collegamento",
      "question": "L'informazione memorizzata nella cache ARP (o tabella ARP -- Address Resolution Protocol) viene mantenuta approssimativamente:",
      "options": [
        {
          "origKey": "a",
          "text": "30 minuti."
        },
        {
          "origKey": "b",
          "text": "30 millisecondi."
        },
        {
          "origKey": "c",
          "text": "10 minuti."
        },
        {
          "origKey": "d",
          "text": "30 secondi."
        }
      ],
      "correctKey": "d",
      "refs": "Appunti del corso p. 35 / RFC 826",
      "explanation": [
        "Per evitare di inviare una richiesta ARP broadcast per ogni singolo pacchetto IP, gli host (e gli switch con Proxy ARP) salvano le associazioni IP–MAC risolte in una tabella temporanea (<strong>ARP cache</strong>). Poiché gli indirizzi IP possono essere riassegnati dinamicamente (es. via DHCP) o le schede di rete possono cambiare, queste voci scadono dopo un tempo breve, indicato negli appunti del corso in circa <strong>30 secondi</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 35,
      "title": "Chiusura gentile (gentle closure) della connessione TCP",
      "topic": "trasporto_app",
      "question": "La chiusura delle connessioni TCP con il flag di FIN (gentle closure):",
      "options": [
        {
          "origKey": "a",
          "text": "Avviene in modo coordinato sulle due half connections solo quando tutta l'informazione è stata trasferita in entrambe le direzioni."
        },
        {
          "origKey": "b",
          "text": "Avviene su iniziativa del server quando ha finito il trasferimento dell'informazione di interesse."
        },
        {
          "origKey": "c",
          "text": "Avviene su iniziativa del client quando ha finito il trasferimento dell'informazione di interesse."
        },
        {
          "origKey": "d",
          "text": "Avviene in modo indipendente sulle due half connections e non impedisce l'invio degli eventuali ACK residui, ad esempio in caso di perdita di pacchetti."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9293",
      "explanation": [
        "Una connessione TCP è <strong>bidirezionale</strong> (composta da due flussi indipendenti: da A verso B e da B verso A). Quando A ha finito di inviare dati, manda un segmento con il flag <code>FIN = 1</code>, che B conferma con un <code>ACK</code>. Da quel momento la direzione <em>A → B</em> è chiusa, ma B può ancora continuare a trasmettere dati ad A (e A può continuare a mandare ACK per riscontrarli) finché anche B non invierà il proprio <code>FIN</code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 36,
      "title": "Quando avviene la consegna diretta di un datagramma IP",
      "topic": "rete",
      "question": "La consegna diretta di un datagramma IP avviene quando:",
      "options": [
        {
          "origKey": "a",
          "text": "Sorgente e destinazione sono collegati allo stesso switch."
        },
        {
          "origKey": "b",
          "text": "Sorgente e destinazione si trovano nella stessa Subnet."
        },
        {
          "origKey": "c",
          "text": "Sorgente e destinazione conoscono i rispettivi indirizzi IP."
        },
        {
          "origKey": "d",
          "text": "Sorgente e destinazione si trovano nella stessa LAN."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 791, RFC 950",
      "explanation": [
        "Prima di spedire un datagramma IP, l'host sorgente applica la propria Subnet Mask (AND logico bit a bit) sia al proprio IP sia all'IP di destinazione. Se il <strong>NetID</strong> risultante è identico, significa che sorgente e destinazione appartengono alla <strong>stessa sottorete (Subnet)</strong>: avviene quindi la <strong>consegna diretta</strong> (l'host risolve il MAC del destinatario via ARP e gli invia direttamente la trama L2, senza passare per alcun router)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 37,
      "title": "La tecnica del Character Stuffing (Livello 2)",
      "topic": "collegamento",
      "question": "La funzione di framing a livello 2 serve a delimitare le trame preparandole per la trasmissione a livello fisico. Come funziona la tecnica \"character stuffing\"?",
      "options": [
        {
          "origKey": "a",
          "text": "Inserisce all'inizio e alla fine di una trama un carattere speciale, ad esempio DLE (Data Link Escape), e se per caso nel payload della trama si trova lo stesso carattere allora viene duplicato dal trasmettitore, ed il ricevitore se identifica una coppia DLE-DLE cancella la seconda prima di consegnare i dati al livello superiore."
        },
        {
          "origKey": "b",
          "text": "La trama inizia con una sequenza di sincronizzazione seguita da un carattere speciale noto come FrameInit, la trama finisce con un silenzio quando non ci sono più dati da trasmettere."
        },
        {
          "origKey": "c",
          "text": "Inserisce all'inizio e alla fine di una trama un carattere speciale, ad esempio DLE (Data Link Escape), e se per caso nel payload della trama si trova lo stesso carattere la trama viene conclusa e se ne inizia un'altra per non avere ambiguità."
        },
        {
          "origKey": "d",
          "text": "Inserisce all'inizio e alla fine di una trama due caratteri speciali che ha preventivamente concordato in una fase di handshake con il ricevitore."
        }
      ],
      "correctKey": "a",
      "refs": "Framing a Livello Data Link",
      "explanation": [
        "Il livello fisico trasmette un flusso continuo e indifferenziato di bit. Il Livello 2 deve delimitare dove inizia e dove finisce ogni trama (<strong>framing</strong>). Con il <strong>Character Stuffing</strong> si usano caratteri speciali di controllo (es. <code>DLE</code>) per marcare inizio e fine trama; per evitare che un byte uguale a <code>DLE</code> presente casualmente nei dati utente venga scambiato per la fine della trama, il trasmettitore lo raddoppia (<code>DLE-DLE</code>) e il ricevitore rimuove il duplicato."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 38,
      "title": "Struttura dell'intestazione delle richieste HTTP",
      "topic": "trasporto_app",
      "question": "La struttura dell'intestazione (header) delle richieste HTTP è (&lt;SP&gt; rappresenta uno spazio):",
      "options": [
        {
          "origKey": "a",
          "text": "È formata da campi testuali della forma: <code>&lt;tag&gt;:&lt;SP&gt;&lt;valore&gt;CRLF</code> tranne che per la prima riga che ha la forma fissa: <code>&lt;metodo&gt;&lt;SP&gt;&lt;URL&gt;&lt;SP&gt;&lt;versione&gt;CRLF</code>"
        },
        {
          "origKey": "b",
          "text": "Non ha una struttura fissa, dipende dal costrutto HTML che si vuole trasferire."
        },
        {
          "origKey": "c",
          "text": "È formata da campi binari di dimensione fissa per velocizzare l'elaborazione."
        },
        {
          "origKey": "d",
          "text": "È formata da campi testuali descrittivi con un formato compatibile con XML, così è facile da parsificare."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 9112",
      "explanation": [
        "Un messaggio di richiesta HTTP (inviato dal browser al server) inizia sempre con la <em>request-line</em> (es. <code>GET /index.html HTTP/1.1\\r\\n</code>), seguita da un numero variabile di righe di intestazione (<em>header fields</em>) nella forma <code>Nome-Campo: Valore\\r\\n</code> e chiusa da una riga vuota (<code>CRLF</code>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 39,
      "title": "Le tre funzioni fondamentali di una rete di telecomunicazioni",
      "topic": "fondamenti",
      "question": "Le tre funzioni fondamentali di una rete di telecomunicazione sono:",
      "options": [
        {
          "origKey": "a",
          "text": "Instradamento, Comunicazione, Inoltro."
        },
        {
          "origKey": "b",
          "text": "Trasmissione, Codifica, Commutazione."
        },
        {
          "origKey": "c",
          "text": "Segnalazione, Apertura di un canale, Trasferimento dell'informazione."
        },
        {
          "origKey": "d",
          "text": "Trasmissione, Commutazione, Segnalazione."
        }
      ],
      "correctKey": "d",
      "refs": "ITU-T / Appunti del corso p. 4",
      "explanation": [
        "All'interno di una rete TLC operano tre funzioni fondamentali:<br>1. <strong>Trasmissione:</strong> trasferimento fisico dei segnali che portano informazione da un punto all'altro.<br>2. <strong>Commutazione:</strong> interconnessione di canali e spostamento delle unità dati da un ingresso a un'uscita dei nodi (router/switch).<br>3. <strong>Segnalazione:</strong> scambio di informazioni di controllo per gestire la rete (apertura/chiusura connessioni, controllo errori, TTL, ecc.)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 40,
      "title": "Tempo minimo di trasferimento di un singolo oggetto in HTTP",
      "topic": "trasporto_app",
      "question": "Nel caso in cui una sessione HTTP trasferisca un singolo oggetto, chiamati RTT il Round Trip Time tra client e server e T<sub>x</sub> il tempo necessario a trasmettere l'oggetto, il tempo minimo di trasferimento è:",
      "options": [
        {
          "origKey": "a",
          "text": "(3RTT + T<sub>x</sub>). Un RTT serve per aprire la connessione TCP, un RTT serve a inviare la richiesta dell'oggetto (che supponiamo molto piccola e quindi con un tempo di trasmissione trascurabile) e a ricevere la risposta positiva (200 OK) dal server seguito immediatamente dalla trasmissione dell'oggetto, che dura T<sub>x</sub>, il terzo RTT serve per l'acknowledgment di ricezione dell'oggetto."
        },
        {
          "origKey": "b",
          "text": "(2RTT + T<sub>x</sub>). Un RTT serve per aprire la connessione TCP, un RTT serve a inviare la richiesta dell'oggetto (che supponiamo molto piccola e quindi con un tempo di trasmissione trascurabile) e a ricevere la risposta positiva (200 OK) dal server seguita immediatamente dalla trasmissione dell'oggetto, che dura T<sub>x</sub>."
        },
        {
          "origKey": "c",
          "text": "(RTT + N(RTT + T<sub>x</sub>/N)). Un RTT serve per aprire la connessione TCP, gli altri N RTT servono a trasmettere gli N segmenti in cui TCP divide l'oggetto per rispettare la MTU a livello IP e ricevere il relativo ACK, mentre ovviamente ciascun segmento impiega T<sub>x</sub>/N per la trasmissione."
        },
        {
          "origKey": "d",
          "text": "(RTT + T<sub>x</sub>). Un RTT serve per aprire la connessione TCP e inviare la richiesta dell'oggetto (che supponiamo molto piccola e quindi con un tempo di trasmissione trascurabile), segue la risposta positiva (200 OK) del server seguita immediatamente dalla trasmissione dell'oggetto, che dura T<sub>x</sub>."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 9112, RFC 9293",
      "explanation": [
        "Per scaricare un oggetto via HTTP servono almeno <code>2 · RTT</code> più il tempo di trasmissione dell'oggetto (<code>T<sub>x</sub></code>):",
        "<strong>1. Primo RTT:</strong> handshake TCP (<code>SYN → SYN-ACK</code>) per aprire la connessione logica.",
        "<strong>2. Secondo RTT + T<sub>x</sub>:</strong> il client invia l'<code>ACK</code> insieme alla richiesta <code>HTTP GET</code> (impiega <code>0.5 · RTT</code> ad arrivare), e il server inizia subito a trasmettere la risposta + l'oggetto (il primo bit impiega <code>0.5 · RTT</code> a tornare, e l'intero file richiede <code>T<sub>x</sub></code> per essere trasmesso). Totale = <code>2 · RTT + T<sub>x</sub></code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 41,
      "title": "Gerarchia dei server autoritativi nel DNS",
      "topic": "trasporto_app",
      "question": "Nel DNS (Domain Name System):",
      "options": [
        {
          "origKey": "a",
          "text": "Ogni dominio deve avere almeno un authoritative server, che deve avere l'indirizzo dell'authoritative server di tutti i domini a cui esso è subordinato."
        },
        {
          "origKey": "b",
          "text": "Ogni dominio deve avere almeno un authoritative server, che deve avere l'indirizzo degli authoritative server dei domini subordinati, se presenti."
        },
        {
          "origKey": "c",
          "text": "Non è necessario che ogni dominio debba avere un authoritative server, purché il server DNS locale abbia l'indirizzo dei server authoritative dei domini subordinati, se presenti."
        },
        {
          "origKey": "d",
          "text": "Non è necessario che ogni dominio debba avere un authoritative server, purché il server DNS locale abbia l'indirizzo del server authoritative del TLD a cui il dominio è subordinato."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 1034",
      "explanation": [
        "L'albero DNS funziona per delega dall'alto verso il basso (da destra verso sinistra nel nome a dominio, es. <code>.it → unibs.it → ing.unibs.it</code>). Ogni livello conosce solo il livello immediatamente subordinato: i server Radice conoscono i server TLD (<code>.it</code>), i server TLD conoscono gli authoritative server dei domini registrati (<code>unibs.it</code>), e questi ultimi conoscono eventuali sottodomini subordinati tramite record <code>NS</code> e <em>glue records</em>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 42,
      "title": "Definizione di BSS (Basic Service Set) in 802.11 (Wi-Fi)",
      "topic": "collegamento",
      "question": "Nel protocollo 802.11 si definisce BSS (Basic Service Set):",
      "options": [
        {
          "origKey": "a",
          "text": "Un insieme di stazioni che usano lo stesso canale e le stesse risorse fisiche e logiche per comunicare tra loro, ma solo se non c'è un Access Point (AP) per l'accesso a Internet, altrimenti si chiama ESS (Extended Service Set)."
        },
        {
          "origKey": "b",
          "text": "L'insieme di tutte le stazioni collegate a un Access Point (AP)."
        },
        {
          "origKey": "c",
          "text": "Un insieme di stazioni che usano lo stesso canale e le stesse risorse fisiche e logiche per comunicare tra loro; un BSS si dice infrastrutturato se esiste una stazione speciale detta Access Point (AP) che interconnette il BSS verso altre reti di tipo LAN oppure direttamente a un router per l'accesso a Internet."
        },
        {
          "origKey": "d",
          "text": "L'area fisica coperta dal segnale di un Access Point (AP)."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.11",
      "explanation": [
        "Nel Wi-Fi (IEEE 802.11), la cella elementare di rete si chiama <strong>BSS (Basic Service Set)</strong>: è il gruppo di stazioni (STA) che condividono lo stesso canale radio. Può essere isolato (IBSS o rete ad-hoc, senza Access Point) oppure <strong>infrastrutturato</strong> quando è presente un <strong>Access Point (AP)</strong> che fa da ponte verso una rete cablata (Distribution System) o verso Internet. Più BSS collegati formano un <strong>ESS (Extended Service Set)</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 43,
      "title": "Protocolli usati nella posta elettronica via Web (webmail)",
      "topic": "trasporto_app",
      "question": "Nel sistema di posta elettronica di Internet, quando si usa un \"web-service\", e non un client di posta locale, quali protocolli vengono usati?",
      "options": [
        {
          "origKey": "a",
          "text": "SMTP tra server sia per inviare che per ricevere messaggi, e anche dal browser per accedere alla casella di posta."
        },
        {
          "origKey": "b",
          "text": "Gli utenti configurano il proprio server di posta dal sito web per decidere il protocollo tra SMTP, IMAP e POP da usare tra server sia per inviare che per ricevere messaggi."
        },
        {
          "origKey": "c",
          "text": "SMTP tra server sia per inviare che per ricevere messaggi; gli utenti visualizzano e gestiscono la posta direttamente sul server con un browser usando quindi HTTP."
        },
        {
          "origKey": "d",
          "text": "SMTP tra server sia per inviare che per ricevere messaggi; POP oppure IMAP dal browser per creare la copia locale della casella di posta sul dispositivo dell'utente."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 5321, RFC 9110",
      "explanation": [
        "Quando usi un servizio Web (come Gmail o la webmail universitaria da browser), non hai un client di posta locale che scarica le email tramite POP3 o IMAP: il tuo browser dialoga direttamente con il server Web del provider usando <strong>HTTP/HTTPS</strong>, mentre lo scambio delle email tra i vari server di posta su Internet continua ad avvenire tramite <strong>SMTP</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 44,
      "title": "Protocolli usati nella posta elettronica con client locale (User Agent)",
      "topic": "trasporto_app",
      "question": "Nel sistema di posta elettronica di Internet, quando si usa un client di posta locale e non un \"web-service\", vengono usati due diversi protocolli: SMTP, e POP oppure IMAP. Qual è la configurazione corretta del sistema?",
      "options": [
        {
          "origKey": "a",
          "text": "SMTP per inviare messaggi; POP oppure IMAP per riceverli."
        },
        {
          "origKey": "b",
          "text": "SMTP tra server sia per inviare che per ricevere messaggi, e dagli User Agent per inviare i messaggi; POP oppure IMAP dagli User Agent per ricevere i messaggi."
        },
        {
          "origKey": "c",
          "text": "SMTP tra server sia per inviare che per ricevere messaggi; POP oppure IMAP dagli User Agent per ricevere e inviare i messaggi."
        },
        {
          "origKey": "d",
          "text": "SMTP tra server sia per inviare che per ricevere messaggi, e dagli User Agent per inviare i messaggi se usano POP per riceverli; se uno User Agent usa IMAP lo usa sia per ricevere che per inviare i messaggi."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 5321, RFC 1939, RFC 9051",
      "explanation": [
        "Con un programma client installato sul PC o sullo smartphone (es. Thunderbird, Outlook), l'invio dell'email dal client al proprio server di posta e il trasferimento tra server avvengono tramite <strong>SMTP</strong> (<em>push</em>). Per scaricare e leggere le email ricevute dalla propria casella sul server, il client usa invece <strong>POP3</strong> oppure <strong>IMAP</strong> (<em>pull</em>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 45,
      "title": "Limiti del NAT verso le connessioni entranti e il P2P",
      "topic": "rete",
      "question": "Nell'ambito dell'utilizzo di un NAT (Network Address Translator):",
      "options": [
        {
          "origKey": "a",
          "text": "Le funzioni di NAT sono spesso accoppiate alle funzioni di inoltro tipiche di un router ed a ulteriori funzioni di gestione del traffico a livello applicativo (ad esempio, firewall)."
        },
        {
          "origKey": "b",
          "text": "Il NAT è più efficiente di un router per l'inoltro, grazie al fatto che salva informazioni di stato relative alle connessioni che lo attraversano."
        },
        {
          "origKey": "c",
          "text": "In generale il NAT non crea problemi alle applicazioni P2P (peer-to-peer) perché per tali applicazioni il NAT è trasparente di default."
        },
        {
          "origKey": "d",
          "text": "Con NAT si possono instaurare connessioni da un indirizzo della rete privata verso la rete pubblica, ma senza ulteriori meccanismi (ad es. STUN o TURN) un client con indirizzo IP pubblico NON può instaurare una connessione verso server con indirizzi privati."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 3022, RFC 5389",
      "explanation": [
        "Il <strong>NAT</strong> (<em>Network Address Translation</em>) crea dinamicamente una voce nella propria tabella di traduzione <em>solo</em> quando un host interno (con IP privato) invia un pacchetto verso l'esterno. Se un host esterno su Internet prova a contattare per primo un dispositivo dietro NAT, il NAT non ha alcuna mappatura in tabella e non sa a quale IP privato inoltrare il pacchetto (problema tipico delle applicazioni <strong>P2P</strong>, risolvibile solo con server di appoggio esterni come <strong>STUN</strong> o <strong>TURN</strong>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 46,
      "title": "Definizione di Authoritative Server (Server di competenza) nel DNS",
      "topic": "trasporto_app",
      "question": "Nella gerarchia della base dati del DNS (Domain Name System) si chiama server di competenza (authoritative server):",
      "options": [
        {
          "origKey": "a",
          "text": "Il server che ha la responsabilità amministrativa di uno specifico dominio, ad esempio mycompany.com, e quindi è la fonte primaria delle informazioni nel DNS relative a quel dominio."
        },
        {
          "origKey": "b",
          "text": "Il server che viene configurato dal DHCP per consentire agli host la risoluzione dei nomi a dominio, e quindi ha la competenza per risolvere gli indirizzi di tutto Internet per gli host di uno specifico dominio, ad esempio mycompany.com."
        },
        {
          "origKey": "c",
          "text": "Tutti i server TLD (Top Level Domain), perché hanno la competenza e l'autorità di re-dirigere le richieste verso i server locali che consentono la traduzione finale degli FQDN (Fully Qualified Domain Name)."
        },
        {
          "origKey": "d",
          "text": "I server, o gruppo di server, radice che ha la competenza per una delle 13 aree in cui sono suddivisi i nomi di Internet."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 1034",
      "explanation": [
        "Mentre i server DNS locali operano solo come <em>cache</em> temporanee, il <strong>server di competenza (authoritative)</strong> è il server ufficiale gestito dall'organizzazione proprietaria del dominio, in cui sono memorizzati i record originali (di tipo <code>A</code>, <code>MX</code>, <code>NS</code>, <code>CNAME</code>) per tutti gli host appartenenti a quel dominio."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 47,
      "title": "Caratteristica di IPv4 eliminata in IPv6",
      "topic": "rete",
      "question": "Quale caratteristica di IPv4 non viene di fatto implementata in IPv6?",
      "options": [
        {
          "origKey": "a",
          "text": "La frammentazione, che in IPv6 viene demandata alla Path MTU Discovery."
        },
        {
          "origKey": "b",
          "text": "L'indirizzamento unicast, sostituito in IPv6 dall'indirizzamento anycast (ricezione da almeno una interfaccia del nodo destinazione)."
        },
        {
          "origKey": "c",
          "text": "Gli strumenti di sicurezza (IPSec per IPv4), che in IPv6 vengono demandati ai livelli superiori (ad esempio TLS)."
        },
        {
          "origKey": "d",
          "text": "Le opzioni aggiuntive negli header, in IPv6 l'header è di lunghezza fissa e non estendibile."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 8200, RFC 8201",
      "explanation": [
        "In IPv4 i router intermedi potevano spezzare (frammentare) un datagramma troppo grande per la MTU del collegamento successivo, creando problemi di prestazioni e riassemblaggio. In <strong>IPv6</strong> la frammentazione lungo il percorso da parte dei router è <strong>categoricamente proibita</strong>: se un pacchetto è troppo grande, il router lo scarta e invia al mittente un messaggio ICMPv6 <em>Packet Too Big</em> (meccanismo di <strong>Path MTU Discovery</strong>, RFC 8201), affinché sia la sorgente a inviare pacchetti più piccoli."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 48,
      "title": "Funzionamento dettagliato dei Cookies",
      "topic": "trasporto_app",
      "question": "Quale delle seguenti affermazioni sui Cookies è corretta?",
      "options": [
        {
          "origKey": "a",
          "text": "Tutti i Cookies devono essere espressamente eliminati dal browser, altrimenti restano validi per sempre (almeno finché il sito web e il browser del client esistono)."
        },
        {
          "origKey": "b",
          "text": "I Cookies non possono consentire di mantenere aperta una sessione utente tra diverse visite (evitando il reinserimento della password, per esempio), perché non sono stati pensati per applicazioni di sicurezza come il login remoto."
        },
        {
          "origKey": "c",
          "text": "I Cookies identificano lo stato di una transazione tra un browser ed un sito web, sono settati dal server sul client nella prima risposta HTTP, e vengono inviati dal client verso il server ogniqualvolta il browser visita lo stesso sito web."
        },
        {
          "origKey": "d",
          "text": "I Cookies identificano lo stato di una transazione tra un browser ed un sito web, sono settati dal server sul client durante l'handshake e riscontrati dal client nella prima richiesta HTTP, e vengono inviati dal server verso il client ogniqualvolta il browser visita lo stesso sito web."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 6265",
      "explanation": [
        "Alla prima visita di un sito, il server invia nell'intestazione della risposta HTTP una riga <code>Set-Cookie: ID</code>. Il browser salva questo codice sul dispositivo dell'utente e, a ogni visita successiva allo stesso dominio, lo reinvia al server nell'intestazione della richiesta HTTP (<code>Cookie: ID</code>), consentendo al sito di riconoscere l'utente."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 49,
      "title": "Significato operativo della Capacità di un canale (Shannon)",
      "topic": "fondamenti",
      "question": "Quale di queste affermazioni è corretta?",
      "options": [
        {
          "origKey": "a",
          "text": "Il rate R di una trasmissione deve essere maggiore della capacità C del canale per garantire (in teoria) che esista un meccanismo per il recupero dei bit in ricezione senza errori."
        },
        {
          "origKey": "b",
          "text": "La capacità C di un canale individua il massimo rate R per il quale è garantito (in teoria) che esista un meccanismo per la decodifica dell'informazione in ricezione senza errori."
        },
        {
          "origKey": "c",
          "text": "Il rate R di una trasmissione è pari alla capacità C del canale quando la banda B del canale trasmissivo è utilizzata interamente."
        },
        {
          "origKey": "d",
          "text": "La capacità C di un canale individua il massimo rate R per il quale è teoricamente possibile occupare una banda B del canale trasmissivo pari a R."
        }
      ],
      "correctKey": "b",
      "refs": "Teorema di Shannon-Hartley",
      "explanation": [
        "Il teorema di Shannon-Hartley stabilisce una soglia netta: finché il tasso di trasmissione (rate <em>R</em>, in bit/s) è <strong>minore o uguale alla capacità C</strong>, esiste teoricamente un codice correttore d'errore che permette di trasmettere dati con probabilità d'errore arbitrariamente piccola (senza errori). Se <em>R &gt; C</em>, nessun sistema di codifica potrà mai evitare gli errori."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 50,
      "title": "Funzione della ARP cache",
      "topic": "collegamento",
      "question": "Qual è la funzione della ARP cache?",
      "options": [
        {
          "origKey": "a",
          "text": "Serve a tener traccia (temporanea) delle corrispondenze note tra indirizzo MAC e indirizzo IP, in questo modo evita di mandare una trama ad un indirizzo IP errato o inesistente."
        },
        {
          "origKey": "b",
          "text": "Serve a velocizzare il processo di binding tra indirizzo MAC e indirizzo IP, perché il processo di costruzione della cache non necessita del processo di ARP request/response."
        },
        {
          "origKey": "c",
          "text": "Serve a tener traccia (temporanea) delle corrispondenze note tra indirizzo MAC e indirizzo IP, evitando di ripetere la risoluzione per un pacchetto IP il cui corrispondente indirizzo MAC è già in cache."
        },
        {
          "origKey": "d",
          "text": "Serve a velocizzare il processo di binding tra indirizzo MAC e indirizzo IP, perché il server che contiene l'ARP cache comunica preventivamente le corrispondenze tra indirizzo MAC e indirizzo IP a lui note."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 826",
      "explanation": [
        "Senza cache, per inviare un file composto da migliaia di pacchetti IP allo stesso destinatario, l'host dovrebbe inviare migliaia di richieste ARP broadcast. Salvando temporaneamente (per circa 30 secondi) l'associazione IP–MAC nella <strong>ARP cache</strong>, l'host risolve l'indirizzo solo per il primo pacchetto e riutilizza subito il MAC per tutti i successivi."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 51,
      "title": "Funzione del numero di porta (16 bit) a livello trasporto",
      "topic": "trasporto_app",
      "question": "Qual è la funzione della porta, rappresentata da un numero di 16 bit?",
      "options": [
        {
          "origKey": "a",
          "text": "Identifica il processo di livello applicativo che ha invocato l'entità di trasporto. Un processo può essere associato a più porte."
        },
        {
          "origKey": "b",
          "text": "Identifica l'entità di trasporto invocata da un processo di livello applicativo. Ogni porta è associata ad un particolare protocollo di livello applicativo."
        },
        {
          "origKey": "c",
          "text": "Identifica il protocollo di livello applicativo utilizzato da un processo. Ogni porta è associata ad un particolare protocollo."
        },
        {
          "origKey": "d",
          "text": "Identifica il processo di livello applicativo che ha invocato l'entità di trasporto. L'identificazione tra processo e porta deve essere uno-a-uno."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 768, RFC 9293",
      "sourceNote": "Corretto il refuso di battitura nell'opzione originale ('ha ifai nvocato' → 'ha invocato').",
      "explanation": [
        "L'indirizzo IP identifica l'interfaccia di rete dell'host, ma su un computer girano contemporaneamente decine di programmi. Le <strong>porte</strong> (numeri interi a 16 bit, da <code>0</code> a <code>65535</code>) identificano i punti di accesso (<em>socket</em>) dei singoli <strong>processi applicativi</strong> sul livello trasporto, permettendo la multiplazione e demultiplazione dei flussi. Un singolo processo (es. un browser con più schede aperte) può aprire più porte effimere contemporaneamente."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 52,
      "title": "Caratteristiche funzionali principali del protocollo HTTP",
      "topic": "trasporto_app",
      "question": "Quali sono le caratteristiche funzionali principali del protocollo HTTP?",
      "options": [
        {
          "origKey": "a",
          "text": "Il client (browser) apre una o più connessioni TCP con la porta 80 del server (web server), avviene uno scambio di messaggi HTTP. Le connessioni vengono chiuse dal client o dal server in funzione della dinamica dell'applicazione, in genere con un \"reset\". HTTP, al contrario di TCP, è un protocollo che non mantiene informazioni di stato."
        },
        {
          "origKey": "b",
          "text": "Il client (browser) apre una connessione TCP dalla porta 80 con una porta effimera del server (web server), avviene uno scambio di messaggi HTTP, e poi la connessione viene chiusa dal server. HTTP, come TCP, è un protocollo che mantiene informazioni di stato per riscontrare gli oggetti ricevuti."
        },
        {
          "origKey": "c",
          "text": "Il client (browser) apre una connessione TCP dalla porta 80 con una porta effimera del server (web server), avviene uno scambio di messaggi HTTP, e poi la connessione viene chiusa dal server. HTTP, al contrario di TCP, è un protocollo che non mantiene informazioni di stato."
        },
        {
          "origKey": "d",
          "text": "Il client (browser) apre una connessione TCP con la porta 80 del server (web server), avviene uno scambio di messaggi HTTP, e poi la connessione viene chiusa quando la ricezione degli oggetti viene confermata dal client. HTTP, come TCP, è un protocollo che mantiene informazioni di stato per riscontrare gli oggetti ricevuti."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 9110, RFC 9112",
      "explanation": [
        "Il client contatta la porta <em>well-known</em> <code>80</code> del web server aprendo una o più connessioni TCP (affidabili e con stato). Sopra di esse viaggiano i messaggi HTTP, che invece è un protocollo <strong>stateless</strong> (non conserva memoria delle richieste precedenti)."
      ],
      "wrongReasons": "La porta <code>80</code> è del <em>server</em>, mentre il client usa una porta effimera <code>&gt; 1024</code> ({{opt:b}}, {{opt:c}}); HTTP non mantiene informazioni di stato ({{opt:b}}, {{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 53,
      "title": "Rapporto tra livello Fisico e livello Data Link",
      "topic": "collegamento",
      "question": "Quale tra le seguenti affermazioni descrive meglio il rapporto tra livello fisico e livello data link?",
      "options": [
        {
          "origKey": "a",
          "text": "Il livello Data-Link utilizza i servizi offerti dal livello fisico (essenzialmente, la trasmissione fisica dei bit), ma in accordo con la separazione logica tra livelli il progetto del livello Data-Link è indipendente dal particolare livello fisico sottostante."
        },
        {
          "origKey": "b",
          "text": "Il livello Data-Link organizza logicamente il flusso di bit trasmesso a livello fisico, e generalmente ciò comporta la trasmissione di più bit rispetto a quanto strettamente necessario per il payload."
        },
        {
          "origKey": "c",
          "text": "Dal punto di vista della rilevazione di errore, il livello fisico si occupa della rilevazione di errori a livello di bit (ad esempio, osservando violazioni della codifica di linea), quello Data-Link a livello di trama."
        },
        {
          "origKey": "d",
          "text": "Il livello fisico incapsula le trame usando specifici header (ad esempio, Start Of Frame) e spaziandole con periodi di silenzio (ad esempio, Inter Frame Gap) per poterle differenziare in ricezione."
        }
      ],
      "correctKey": "b",
      "refs": "IEEE 802",
      "explanation": [
        "Il livello <strong>Fisico</strong> fornisce al livello superiore un flusso grezzo e continuo di bit (0 e 1). Il livello <strong>Data Link</strong> organizza questo flusso in unità strutturate (<strong>trame/frame</strong>) aggiungendo bit di controllo (<em>overhead</em>): preamboli di sincronizzazione, indirizzi MAC, campi lunghezza e bit di CRC per la rilevazione degli errori."
      ],
      "wrongReasons": "In realtà il Livello 2 <em>non</em> è totalmente indipendente dal mezzo fisico sottostante ({{opt:a}}); il framing e gli spazi tra trame sono compiti del Livello 2, non del livello fisico ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 54,
      "title": "Affermazione SBAGLIATA sulle applicazioni di Internet",
      "topic": "trasporto_app",
      "question": "Quale tra le seguenti affermazioni sulle applicazioni di Internet è SBAGLIATA?",
      "options": [
        {
          "origKey": "a",
          "text": "Gli eventuali requisiti di privacy nelle applicazioni sono più facili da raggiungere se le applicazioni sono in cloud rispetto a quelle con architettura peer-to-peer (ogni peer rinuncia di fatto alla privacy rispetto agli altri)."
        },
        {
          "origKey": "b",
          "text": "Le applicazioni real-time non possono tollerare ritardi, ma possono talvolta tollerare perdite di dati e scarso throughput."
        },
        {
          "origKey": "c",
          "text": "Le applicazioni di trasferimento dati (come FTP) non possono tollerare la perdita di dati, ma possono talvolta tollerare un lieve ritardo e scarso throughput."
        },
        {
          "origKey": "d",
          "text": "Le applicazioni di instant messaging e la posta elettronica hanno in generale requisiti di ritardo e throughput non troppo stringenti, ma non possono tollerare la perdita di dati."
        }
      ],
      "correctKey": "a",
      "refs": "Requisiti delle applicazioni di rete",
      "explanation": [
        "La domanda chiede quale affermazione sia <strong>falsa/sbagliata</strong>. La ({{opt:a}}) è falsa perché nel modello Cloud (evoluzione del Client/Server) l'utente carica ed elabora i propri dati su server remoti gestiti da terze parti, cedendo loro il controllo sui dati. Le altre tre affermazioni ({{opt:b}}, {{opt:c}}, {{opt:d}}) descrivono invece correttamente i requisiti di ritardo e perdita delle applicazioni real-time, FTP e messaggistica/email."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 55,
      "title": "Valori della MTU (Maximum Transmission Unit)",
      "topic": "rete",
      "question": "Quali valori può assumere la MTU?",
      "options": [
        {
          "origKey": "a",
          "text": "Il valore minimo è 576B, lo standard di fatto è 1500B (MTU di Ethernet)."
        },
        {
          "origKey": "b",
          "text": "Il valore minimo è 576B, lo standard di fatto è 1538B (MTU di Ethernet)."
        },
        {
          "origKey": "c",
          "text": "Il valore minimo è 64B (per permettere a CSMA/CD di Ethernet di funzionare), lo standard di fatto è 1538B (MTU di Ethernet)."
        },
        {
          "origKey": "d",
          "text": "Il valore minimo è 64B (per permettere a CSMA/CD di Ethernet di funzionare), lo standard di fatto è 1500B (MTU di Ethernet)."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 791, IEEE 802.3",
      "explanation": [
        "La <strong>MTU</strong> è la dimensione massima del <strong>payload (dati)</strong> che può essere trasportato all'interno di una singola trama di Livello 2. Lo <strong>standard di fatto è 1500 byte</strong> (payload massimo di una trama Ethernet IEEE 802.3), mentre <strong>576 byte</strong> è la dimensione minima del datagramma IPv4 che ogni host deve poter ricevere e riassemblare secondo lo standard RFC 791."
      ],
      "wrongReasons": "64 byte è la dimensione <em>minima</em> di una trama Ethernet per far funzionare CSMA/CD, non la MTU; 1538 byte include anche header e trailer Ethernet, mentre la MTU riguarda il payload.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 56,
      "title": "Caratteristiche dell'header IPv4",
      "topic": "rete",
      "question": "Quali delle seguenti affermazioni sull'header IP è VERA?",
      "options": [
        {
          "origKey": "a",
          "text": "Il campo IP destinazione viene aggiornato a ogni inoltro, mettendo l'indirizzo del Next-Hop."
        },
        {
          "origKey": "b",
          "text": "Il campo TTL viene decrementato solo alla destinazione."
        },
        {
          "origKey": "c",
          "text": "La lunghezza complessiva dell'header IP, compresa di eventuali opzioni, deve essere un multiplo intero di 32 bit."
        },
        {
          "origKey": "d",
          "text": "Il campo checksum consente la rilevazione di errori sull'intero datagramma, incluso il payload."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 791",
      "explanation": [
        "L'intestazione IPv4 ha una parte fissa di 20 byte (5 righe da 32 bit) più eventuali opzioni. Il campo <strong>IHL</strong> (<em>Internet Header Length</em>, 4 bit) misura la lunghezza dell'header in <strong>parole da 32 bit</strong> (4 byte): per questo motivo l'header (tramite l'aggiunta di bit di <em>padding</em>) deve sempre essere un <strong>multiplo intero di 32 bit</strong>."
      ],
      "wrongReasons": "L'IP destinazione non cambia mai lungo il percorso, cambiano solo gli indirizzi MAC ({{opt:a}}); il TTL viene decrementato ad ogni hop (router), non solo a destinazione ({{opt:b}}); il checksum IP controlla <em>solo l'header</em>, non il payload ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 57,
      "title": "Periodo di vulnerabilità T_v nello Slotted Aloha",
      "topic": "collegamento",
      "question": "Si consideri una generica trama F e sia t<sub>0</sub> l'istante di inizio della trasmissione della trama F. Si ricordi la definizione di tempo di vulnerabilità T<sub>v</sub> per una trama F, ovvero l'intervallo temporale all'interno del quale la generazione di una trama da parte di un'altra stazione porta ad una collisione. Nel protocollo slotted Aloha con slot di durata temporale T, quanto vale T<sub>v</sub>?",
      "options": [
        {
          "origKey": "a",
          "text": "T<sub>v</sub> = T. In particolare la trama considerata collide con tutte le trame generate nello slot (di durata T) precedente al tempo t<sub>0</sub>."
        },
        {
          "origKey": "b",
          "text": "T<sub>v</sub> = 2T. In particolare la trama considerata collide con tutte le trame generate nell'intervallo T di trasmissione della trama stessa, e con quelle generate nello slot precedente."
        },
        {
          "origKey": "c",
          "text": "T<sub>v</sub> = T/2. In particolare la trama considerata collide solamente con le trame generate prima di t<sub>0</sub>, ma non con quelle generate nella prima parte dello slot precedente perché sono già state trasmesse."
        },
        {
          "origKey": "d",
          "text": "T<sub>v</sub> = T. In particolare la trama considerata collide con tutte le trame generate nell'intervallo T di trasmissione della trama stessa, quindi tra t<sub>0</sub> e t<sub>0</sub>+T."
        }
      ],
      "correctKey": "a",
      "refs": "Analisi Aloha / Slotted Aloha",
      "explanation": [
        "Nell'<strong>Aloha puro</strong>, una trama trasmessa all'istante <em>t<sub>0</sub></em> collide con qualsiasi altra trama iniziata tra <em>t<sub>0</sub> − T</em> e <em>t<sub>0</sub> + T</em>, quindi il periodo di vulnerabilità è <code>2T</code>.",
        "Nello <strong>Slotted Aloha</strong>, il tempo è diviso in slot discreti di durata <em>T</em> e le stazioni possono trasmettere <em>solo all'inizio di uno slot</em>. Affinché una trama trasmessa allo slot che inizia in <em>t<sub>0</sub></em> subisca una collisione, un'altra stazione deve aver generato un pacchetto durante lo <strong>slot precedente</strong> (tra <em>t<sub>0</sub> − T</em> e <em>t<sub>0</sub></em>) per poi trasmetterlo anch'essa in <em>t<sub>0</sub></em>. Il periodo di vulnerabilità si dimezza quindi a <code>T<sub>v</sub> = T</code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 58,
      "title": "Operazione di forwarding in un router",
      "topic": "rete",
      "question": "Si considerino le funzioni proprie di un router. L'operazione di forwarding:",
      "options": [
        {
          "origKey": "a",
          "text": "Modifica le intestazioni di livello fisico e data-link (livelli 1 e 2) per poter inoltrare il pacchetto su un'interfaccia diversa da quella da cui l'ha ricevuto; la decisione di instradamento dipende dall'intestazione del datagramma, che non deve mai essere modificata per consentire la corretta ricezione al destinatario."
        },
        {
          "origKey": "b",
          "text": "Opera in base all'intestazione del datagramma, prendendo delle decisioni di instradamento che dipendono dal contenuto di questa intestazione, e aggiungendo l'indirizzo del prossimo router verso la destinazione (next hop) all'interno dell'intestazione."
        },
        {
          "origKey": "c",
          "text": "Opera in base all'intestazione del datagramma, prendendo delle decisioni di instradamento che dipendono dal contenuto di questa intestazione ed eventualmente modificandola prima di inoltrarla verso la destinazione (o un altro router)."
        },
        {
          "origKey": "d",
          "text": "Prende la decisione di instradamento in base all'intestazione del datagramma, e inoltra il pacchetto verso la destinazione trasformando l'indirizzo della destinazione finale in un indirizzo di livello 2 per poter effettuare la consegna sulla rete fisica."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 791",
      "explanation": [
        "Quando un router inoltra (<em>forwarding</em>) un pacchetto da una sottorete a un'altra, estrae il datagramma IP dalla trama L2 di ingresso, consulta la tabella di routing basandosi sull'<strong>IP di destinazione</strong> (lasciando intatti gli indirizzi IP di sorgente e destinazione) e re-incapsula il datagramma in una <strong>nuova trama di Livello 2</strong> adatta al collegamento di uscita (cambiando gli indirizzi MAC). <em>(Nota: nell'header IP viene comunque decrementato il TTL e ricalcolato il checksum, ma gli indirizzi IP end-to-end restano invariati.)</em>"
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 59,
      "title": "Throughput di Aloha e Slotted Aloha",
      "topic": "collegamento",
      "question": "Sotto opportune ipotesi semplificative (numero infinito di stazioni, tempo di trama fisso, generazione delle trame per ogni stazione che segue un processo di Poisson e stazione bloccata durante la trasmissione, tempo di ritrasmissione molto maggiore del tempo di trama), e detto G il traffico medio offerto da ogni stazione (espresso in trame offerte per tempo di trama e comprensivo delle ritrasmissioni), quanto vale il throughput per i protocolli di accesso al mezzo Aloha e Slotted Aloha?",
      "options": [
        {
          "origKey": "a",
          "text": "G e<sup>−2G</sup> per Aloha e G e<sup>−G</sup> per Slotted Aloha, il throughput massimo di Slotted Aloha è il doppio di quello di Aloha."
        },
        {
          "origKey": "b",
          "text": "G e<sup>−2G</sup> per Aloha e 2G e<sup>−2G</sup> per Slotted Aloha, il throughput massimo di Slotted Aloha è il doppio di quello di Aloha."
        },
        {
          "origKey": "c",
          "text": "G e<sup>−G</sup> per Aloha e 2G e<sup>−G</sup> per Slotted Aloha, il throughput massimo di Slotted Aloha è il doppio di quello di Aloha."
        },
        {
          "origKey": "d",
          "text": "G e<sup>−G</sup> per Aloha e G e<sup>−2G</sup> per Slotted Aloha, il throughput massimo di Slotted Aloha è e volte quello di Aloha."
        }
      ],
      "correctKey": "a",
      "refs": "Analisi prestazionale ALOHA",
      "explanation": [
        "Assumendo arrivi secondo un processo di Poisson con traffico offerto <em>G</em>, la probabilità che non ci siano altre trasmissioni nel periodo di vulnerabilità <em>T<sub>v</sub></em> è <code>e<sup>−G·(T<sub>v</sub>/T)</sup></code>.",
        "• <strong>Aloha puro</strong> (<em>T<sub>v</sub> = 2T</em>): <code>S = G · e<sup>−2G</sup></code>, massimo per <em>G = 0.5</em> pari a <code>1/(2e) ≈ 0.184</code> (18–19%).",
        "• <strong>Slotted Aloha</strong> (<em>T<sub>v</sub> = T</em>): <code>S = G · e<sup>−G</sup></code>, massimo per <em>G = 1</em> pari a <code>1/e ≈ 0.368</code> (37%), esattamente il <strong>doppio</strong> rispetto ad Aloha puro."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 60,
      "title": "Il Three-Way Handshake di TCP",
      "topic": "trasporto_app",
      "question": "TCP per aprire una connessione logica tra un client e un server effettua una procedura chiamata Three Way Handshake iniziata dal client. Durante questa procedura, chiamando rispettivamente S1, S2 e S3 i tre messaggi scambiati tra client e server si ha:",
      "options": [
        {
          "origKey": "a",
          "text": "Flag SYN: vale 1 in S1 e S2, e 0 in S3; Campo Sequence Number: ha un valore in S1 e S2 che dipende dalle dimensioni dell'oggetto da trasferire sulla connessione TCP (ISN1 e ISN2), in S3 ha un valore uguale alla dimensione in byte del segmento trasmesso, eventualmente uguale a zero se il segmento non contiene dati; Flag ACK: vale 0 in S1, 1 in S2 e S3; Campo Acknowledgement Number: indefinito in S1, vale ISN1+1 in S2 e ISN2+1 in S3."
        },
        {
          "origKey": "b",
          "text": "Flag SYN: vale 1 in S1 e S2, e 0 in S3; Campo Sequence Number: ha un valore fisso che dipende dall'host in S1 e S2 (ISN1 e ISN2 rispettivamente) da cui TCP comincia a contare le proprie PDU (in byte), in S3 indica effettivamente il \"sequence number\" del primo byte del segmento; Flag ACK: vale 1 in S1 e S2, e 0 in S3; Campo Acknowledgement Number: indefinito in S1, S2 e S3."
        },
        {
          "origKey": "c",
          "text": "Flag SYN: vale 1 in S1, S2 e S3; Campo Sequence Number: ha un valore generato casualmente in S1, S2 e S3 (ISN1, ISN2 e ISN3 rispettivamente) da cui TCP comincia a contare le proprie PDU (in byte); Flag ACK: vale 0 in S1, S2 e S3, perché i segmenti non contengono dati da riscontrare; Campo Acknowledgement Number: indefinito in S1, S2 e S3."
        },
        {
          "origKey": "d",
          "text": "Flag SYN: vale 1 in S1 e S2, e 0 in S3; Campo Sequence Number: ha un valore generato casualmente in S1 e S2 (ISN1 e ISN2 rispettivamente) da cui TCP comincia a contare le proprie PDU (in byte), in S3 indica effettivamente il \"sequence number\" del primo byte del segmento; Flag ACK: vale 1 in S2 e S3, e 0 in S1; Campo Acknowledgement Number: indefinito in S1, vale ISN1+1 in S2 e ISN2+1 in S3."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9293",
      "explanation": [
        "Prima di scambiare dati, client e server aprono la connessione logica TCP con 3 messaggi (<strong>Three-Way Handshake</strong>):<br>1. <strong>S1 (SYN):</strong> Il client invia <code>SYN = 1</code>, <code>ACK = 0</code> e sceglie un numero di sequenza iniziale casuale <code>ISN1</code> (ACK Number non valido/indefinito).<br>2. <strong>S2 (SYN + ACK):</strong> Il server risponde con <code>SYN = 1</code>, <code>ACK = 1</code>, sceglie il proprio numero iniziale casuale <code>ISN2</code> e riscontra il SYN del client ponendo <code>ACK Number = ISN1 + 1</code>.<br>3. <strong>S3 (ACK):</strong> Il client conferma con <code>SYN = 0</code>, <code>ACK = 1</code>, <code>Sequence Number = ISN1 + 1</code> (primo byte di dati) e riscontra il SYN del server ponendo <code>ACK Number = ISN2 + 1</code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 61,
      "title": "Importanza della multiplazione a livello trasporto",
      "topic": "trasporto_app",
      "question": "Tra le funzioni fondamentali del livello trasporto la multiplazione è tra le più fondamentali, perché?",
      "options": [
        {
          "origKey": "a",
          "text": "Definisce in modo chiaro i punti di accesso alla rete, evitando che le informazioni di host diversi vengano confuse tra loro."
        },
        {
          "origKey": "b",
          "text": "Consente la coesistenza di un numero arbitrario di applicazioni sullo stesso protocollo di trasporto."
        },
        {
          "origKey": "c",
          "text": "Consente la coesistenza di diverse connessioni TCP per una stessa applicazione (ad esempio HTTP) migliorando la velocità di trasferimento."
        },
        {
          "origKey": "d",
          "text": "Consente di identificare i flussi dei dati in modo univoco in qualsiasi punto della rete."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 768, RFC 9293",
      "explanation": [
        "Il livello IP consegna i pacchetti all'host, ma non distingue tra i vari programmi in esecuzione su di esso. Grazie alle <strong>porte</strong>, il livello trasporto (TCP/UDP) raccoglie i flussi provenienti da più processi applicativi contemporaneamente e li convoglia sull'unico livello di rete sottostante (<strong>multiplazione</strong>), smistandoli poi al processo corretto in arrivo (<strong>demultiplazione</strong>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 62,
      "title": "Funzioni implementate da UDP",
      "topic": "trasporto_app",
      "question": "UDP (User Datagram Protocol) è, insieme a TCP, il più diffuso protocollo di livello trasporto in Internet. Quali dei seguenti gruppi di funzioni vengono implementate in UDP?",
      "options": [
        {
          "origKey": "a",
          "text": "Multiplazione e demultiplazione; Incapsulamento dei dati di livello applicativo; Consegna dei dati al livello applicativo; Setup della connessione."
        },
        {
          "origKey": "b",
          "text": "Multiplazione e demultiplazione; Incapsulamento dei dati di livello applicativo; Consegna dei dati al livello applicativo; Controllo di flusso ma non di congestione."
        },
        {
          "origKey": "c",
          "text": "Multiplazione e demultiplazione; Incapsulamento dei dati di livello applicativo; Consegna dei dati al livello applicativo; Controllo di correttezza opzionale."
        },
        {
          "origKey": "d",
          "text": "Multiplazione e demultiplazione; Incapsulamento dei dati di livello applicativo; Consegna in ordine dei dati al livello applicativo."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 768",
      "explanation": [
        "<strong>UDP</strong> (<em>User Datagram Protocol</em>) è un protocollo di trasporto minimale e <em>connectionless</em>: aggiunge solo le porte (per multiplazione/demultiplazione) e un campo <strong>Checksum a 16 bit</strong> (opzionale in IPv4, obbligatorio in IPv6) per rilevare eventuali errori, senza aprire connessioni, senza riordinare i pacchetti e senza fare controllo di flusso o congestione."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 63,
      "title": "Cosa fa un dispositivo NAT",
      "topic": "rete",
      "question": "Un dispositivo NAT (Network Address Translation):",
      "options": [
        {
          "origKey": "a",
          "text": "È un dispositivo che consente a host con indirizzo IP privato di accedere a Internet cambiando l'indirizzo IP sorgente dei pacchetti in uscita e di conseguenza quello destinazione dei pacchetti in ingresso."
        },
        {
          "origKey": "b",
          "text": "È un dispositivo che consente a host con indirizzo IP privato di accedere a Internet cambiando l'indirizzo IP destinazione dei pacchetti in uscita e di conseguenza quello sorgente dei pacchetti in ingresso."
        },
        {
          "origKey": "c",
          "text": "È un qualsiasi router che capisce gli indirizzi IP privati."
        },
        {
          "origKey": "d",
          "text": "È un router che collega una subnet privata a una subnet pubblica."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 3022",
      "explanation": [
        "Gli indirizzi IP privati (RFC 1918: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>) non possono viaggiare su Internet. Quando un pacchetto esce dalla rete locale verso Internet, il NAT sostituisce l'IP privato del mittente (<strong>IP sorgente</strong>) con l'IP pubblico del NAT stesso. Quando arriva la risposta da Internet, il NAT compie l'operazione inversa, sostituendo l'<strong>IP destinazione</strong> pubblico con l'IP privato dell'host originario."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 64,
      "title": "Come opera nel dettaglio un NAT / NAPT",
      "topic": "rete",
      "question": "Un dispositivo di tipo NAT (Network Address Translator) permette a dei dispositivi con indirizzo IP privato di accedere ad Internet. In che modo?",
      "options": [
        {
          "origKey": "a",
          "text": "Intercettando i segmenti TCP o i datagrammi UDP \"impersonando\" l'host con indirizzo IP privato. Ad esempio, nel caso l'host interno alla rete privata tenti di instaurare una connessione TCP, il NAT risponde come se fosse l'host di destinazione e, al contempo, instaura una connessione TCP fra di esso e l'effettivo host di destinazione. Una volta instaurate le due connessioni, il NAT si occupa di trasferire i segmenti da una connessione all'altra."
        },
        {
          "origKey": "b",
          "text": "Impersonando la destinazione in base al servizio richiesto. Ad esempio, nel caso in cui l'host con indirizzo IP privato stia tentando di visitare un sito web attraverso richieste HTTP, il NAT interpreta la richiesta HTTP, si collega all'effettiva destinazione ed effettua la richiesta HTTP al posto dell'host interno, inoltrando poi la risposta al client."
        },
        {
          "origKey": "c",
          "text": "Modificando l'indirizzo IP sorgente, impostandolo come l'indirizzo IP pubblico dell'interfaccia del NAT esposta verso Internet e, se necessario, modificando la porta sorgente. Nell'effettuare tale operazione, il dispositivo salva tale mappatura in una tabella in modo da poter fare la conversione inversa sui pacchetti di ritorno."
        },
        {
          "origKey": "d",
          "text": "Incapsulando il pacchetto con indirizzo IP privato all'interno di un altro pacchetto IP (tunneling IP) avente come IP sorgente l'indirizzo IP pubblico dell'interfaccia del NAT esposta verso Internet e come destinazione l'effettiva destinazione. Il ricevitore risponderà con un incapsulamento simile (solamente a indirizzi invertiti) permettendo poi al NAT di decapsulare la risposta e inoltrarla all'interno della rete privata come un normale pacchetto IP."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 3022",
      "explanation": [
        "Per permettere a centinaia di dispositivi privati di condividere un <strong>unico IP pubblico</strong>, il NAT (nella versione <strong>NAPT</strong>, <em>Network Address and Port Translation</em>) modifica sia l'IP sorgente sia la <strong>porta sorgente</strong> dei pacchetti in uscita, annotando l'associazione <code>(IP_privato, Porta_privata) &lt;-&gt; (IP_pubblico, Porta_NAT)</code> in una tabella di stato dinamica per poter instradare correttamente i pacchetti di ritorno."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 65,
      "title": "Rappresentazione di una rete tramite grafo G=(V,A)",
      "topic": "fondamenti",
      "question": "Un grafo G=(V,A) rappresenta correttamente una rete di telecomunicazione quando:",
      "options": [
        {
          "origKey": "a",
          "text": "V è l'insieme dei dispositivi della rete, inclusi i terminali, e A è l'insieme delle funzioni logiche implementate che consentono l'interconnessione di dispositivi e terminali."
        },
        {
          "origKey": "b",
          "text": "V è l'insieme dei commutatori della rete e A è l'insieme dei canali di trasmissione che interconnettono i commutatori."
        },
        {
          "origKey": "c",
          "text": "V è l'insieme dei nodi della rete e A è l'insieme delle schede di rete che consentono la trasmissione sui canali trasmissivi."
        },
        {
          "origKey": "d",
          "text": "V è l'insieme dei canali di trasmissione e A è l'insieme delle funzioni di commutazione che li interconnettono."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti del corso p. 5",
      "explanation": [
        "Negli appunti (pagina 5), la topologia di una rete di telecomunicazioni è formalizzata come un grafo <em>G = (V, A)</em>, dove i vertici <strong>V</strong> rappresentano i <strong>nodi di commutazione</strong> (dove i canali vengono interconnessi, es. router/switch) e gli archi <strong>A</strong> rappresentano i <strong>canali di trasmissione</strong> che li collegano."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 66,
      "title": "Invio di un'immagine JPEG allegata a un'email",
      "topic": "trasporto_app",
      "question": "Un messaggio di posta elettronica con un allegato in formato JPEG (immagine):",
      "options": [
        {
          "origKey": "a",
          "text": "Contiene nel corpo del messaggio l'URL (Universal Resource Locator) da cui lo User Agent di posta può scaricare l'immagine; nell'intestazione deve essere specificato l'uso del protocollo da usare per scaricare l'immagine, ad esempio HTTP, MIME, FTP."
        },
        {
          "origKey": "b",
          "text": "È un normale messaggio di posta che alla fine contiene il file binario codificato JPEG con l'immagine, l'intestazione indica il numero di allegati presenti."
        },
        {
          "origKey": "c",
          "text": "Contiene nel corpo del messaggio il file immagine codificato JPEG; nell'intestazione deve essere specificato l'uso dei formati MIME (Multimedia Internet Mail Extension) e la versione di MIME, il contenuto del file e l'indicazione dell'applicativo usato per produrre il file."
        },
        {
          "origKey": "d",
          "text": "Contiene nel corpo del messaggio il file immagine codificato 'base64'; nell'intestazione deve essere specificato l'uso dei formati MIME (Multimedia Internet Mail Extension) e la versione di MIME, il codice usato per rendere il file compatibile con SMTP e il tipo di contenuto del file stesso."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 2045, RFC 2046",
      "explanation": [
        "Il protocollo SMTP (RFC 5321) fu progettato originariamente per trasportare solo puro testo ASCII a 7 bit. Per inviare file binari (come immagini JPEG, PDF, audio), si usano le estensioni <strong>MIME</strong>: nell'intestazione si dichiarano la versione MIME (<code>MIME-Version: 1.0</code>), il tipo di contenuto (<code>Content-Type: image/jpeg</code>) e la codifica (<code>Content-Transfer-Encoding: base64</code>), che trasforma i byte binari dell'immagine in caratteri testuali ASCII compatibili con SMTP."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 67,
      "title": "Range di indirizzi per la consegna diretta in una subnet /16",
      "topic": "rete",
      "question": "Un host con indirizzo <code>162.168.0.15/16</code> effettua una consegna diretta dei datagrammi ai seguenti range di indirizzi:",
      "options": [
        {
          "origKey": "a",
          "text": "<code>162.168.0.1--162.168.255.255</code>"
        },
        {
          "origKey": "b",
          "text": "<code>162.168.0.0--162.168.0.255</code>"
        },
        {
          "origKey": "c",
          "text": "<code>162.168.16.0--162.168.255.255</code>"
        },
        {
          "origKey": "d",
          "text": "<code>162.168.0.2--162.168.255.254</code> (.0.1 è riservato al router e .255.255 non è un indirizzo unicast)"
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 950, RFC 4632",
      "explanation": [
        "L'host ha indirizzo <code>162.168.0.15/16</code>: i primi 16 bit (<code>162.168</code>) identificano la rete (NetID), mentre gli ultimi 16 bit identificano gli host (HostID).",
        "Tutti gli indirizzi che iniziano per <code>162.168.</code> fanno parte della stessa subnet e ricevono quindi una <strong>consegna diretta</strong> (dal primo indirizzo utile <code>162.168.0.1</code> fino all'indirizzo di broadcast diretto <code>162.168.255.255</code>, poiché <code>162.168.0.0</code> è l'indirizzo di rete e non è un destinatario valido)."
      ],
      "wrongReasons": "La ({{opt:d}}) è errata: l'indirizzo <code>.0.1</code> non è riservato al router da alcun protocollo (è solo una consuetudine amministrativa) e anche il broadcast <code>.255.255</code> viene consegnato direttamente nella subnet.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 68,
      "title": "Astrazione offerta dal livello Trasporto",
      "topic": "trasporto_app",
      "question": "Un protocollo di livello trasporto:",
      "options": [
        {
          "origKey": "a",
          "text": "Fornisce una astrazione end-to-end dell'intera rete, consentendo ai protocolli di livello applicativo di conoscere i dettagli e la topologia della rete sottostante quando ne hanno bisogno."
        },
        {
          "origKey": "b",
          "text": "Fornisce una astrazione end-to-end dell'intera rete, nascondendo ai protocolli di livello applicativo qualsiasi dettaglio dei livelli sottostanti, inclusa la topologia della rete."
        },
        {
          "origKey": "c",
          "text": "Consente di effettuare l'instradamento delle connessioni su IP anche se IP è un protocollo a commutazione di pacchetto."
        },
        {
          "origKey": "d",
          "text": "Consente di gestire connessioni unicast fra sorgente e destinazione, per le connessioni multicast invece le applicazioni devono per forza usare direttamente il livello IP per controllare l'opportuna duplicazione delle informazioni verso i molti utenti."
        }
      ],
      "correctKey": "b",
      "refs": "Architettura protocollare",
      "explanation": [
        "Il livello Trasporto viene implementato <strong>solo sugli host terminali</strong> (client e server) e non nei router intermedi. In questo modo vede l'intera rete sottostante come una \"scatola nera\" (<em>black box</em>) e fornisce alle applicazioni un canale logico diretto <strong>end-to-end</strong> tra processi, nascondendo completamente percorsi, router e tecnologie trasmissive."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 69,
      "title": "Significato del flag ACK = 1 in TCP",
      "topic": "trasporto_app",
      "question": "Un segmento TCP con il flag di ACK posto a 1:",
      "options": [
        {
          "origKey": "a",
          "text": "È un segmento di riscontro, l'ACK Number è nel payload."
        },
        {
          "origKey": "b",
          "text": "È un segmento di riscontro, il campo ACK Number dell'header è valido."
        },
        {
          "origKey": "c",
          "text": "È un segmento di riscontro, e non può contenere dati."
        },
        {
          "origKey": "d",
          "text": "Può essere un segmento di riscontro, non lo è nei casi in cui anche SYN o FIN siano a 1 (handshake e gentle closure)."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 9293",
      "explanation": [
        "Nell'intestazione TCP c'è un bit di controllo chiamato <strong>flag <code>ACK</code></strong>. Quando questo bit è posto a 1, indica al ricevitore che il numero contenuto nel campo <code>Acknowledgment Number</code> dell'header è significativo e valido."
      ],
      "wrongReasons": "L'ACK Number sta nell'<em>header</em>, non nel payload ({{opt:a}}); grazie al <em>piggybacking</em>, un segmento con <code>ACK = 1</code> può trasportare contemporaneamente anche dati utente ({{opt:c}}); anche durante handshake (<code>SYN+ACK</code>) e chiusura (<code>FIN+ACK</code>) il flag <code>ACK</code> è attivo e riscontra i flag ricevuti ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 70,
      "title": "Definizione di architettura protocollare",
      "topic": "fondamenti",
      "question": "Una architettura protocollare:",
      "options": [
        {
          "origKey": "a",
          "text": "È la descrizione di tutte e sole le funzioni essenziali e obbligatorie per il corretto funzionamento di una rete di telecomunicazione; i singoli protocolli implementano tutte queste funzioni ed eventualmente altre funzioni aggiuntive. Nella descrizione dell'architettura, tuttavia, non vengono mai incluse funzioni che non siano essenziali."
        },
        {
          "origKey": "b",
          "text": "È la descrizione, al più alto livello di astrazione, dell'organizzazione fisica di una rete di telecomunicazione, dei suoi dispositivi e dei suoi canali di comunicazione."
        },
        {
          "origKey": "c",
          "text": "È la descrizione, al più alto livello di astrazione, dell'organizzazione logica di una rete di telecomunicazione."
        },
        {
          "origKey": "d",
          "text": "È la descrizione dettagliata delle funzioni di un protocollo, indipendentemente dal suo livello protocollare."
        }
      ],
      "correctKey": "c",
      "refs": "Appunti del corso pp. 2, 7",
      "explanation": [
        "Come definito nel dizionario e nel capitolo dedicato degli appunti (pagine 2 e 7), un'<strong>architettura protocollare</strong> è l'insieme dei protocolli (organizzati in uno <em>stack a livelli</em>) e delle loro interrelazioni che definiscono l'<strong>organizzazione logica</strong> della comunicazione, astraendo dai singoli dispositivi fisici o dai cavi materiali."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 71,
      "title": "Struttura binaria della Subnet Mask IPv4",
      "topic": "rete",
      "question": "Una Subnet Mask di un indirizzo IPv4 è una sequenza di 32 bit in cui:",
      "options": [
        {
          "origKey": "a",
          "text": "Tutti i bit corrispondenti alla parte netID dell'indirizzo sono posti a 1 mentre i bit corrispondenti alla parte hostID replicano i bit dell'indirizzo stesso."
        },
        {
          "origKey": "b",
          "text": "I bit più a sinistra sono i bit dell'indirizzo di rete (netID), mentre i bit più a destra sono messi a 0 per \"mascherare\" l'hostID."
        },
        {
          "origKey": "c",
          "text": "Tutti i bit corrispondenti alla parte netID dell'indirizzo sono posti a 0 e tutti i bit corrispondenti alla parte hostID sono messi a 1."
        },
        {
          "origKey": "d",
          "text": "Tutti i bit corrispondenti alla parte netID dell'indirizzo sono posti a 1 e tutti i bit corrispondenti alla parte hostID sono messi a 0."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 950",
      "explanation": [
        "La <strong>Subnet Mask</strong> è una sequenza di 32 bit associata all'indirizzo IPv4 che serve a separare la parte di rete da quella dell'host: ha <strong>tutti bit a 1</strong> in corrispondenza dei bit del NetID e <strong>tutti bit a 0</strong> in corrispondenza dei bit dell'HostID. Eseguendo un <code>AND</code> bit a bit tra l'indirizzo IP e la Subnet Mask si estrae immediatamente l'indirizzo della sottorete."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 72,
      "title": "Switch Ethernet e domini di collisione / broadcast",
      "topic": "collegamento",
      "question": "Uno switch Ethernet:",
      "options": [
        {
          "origKey": "a",
          "text": "Spezza sia il dominio di broadcast sia il dominio di collisione."
        },
        {
          "origKey": "b",
          "text": "Spezza il dominio di collisione ma non il dominio di broadcast."
        },
        {
          "origKey": "c",
          "text": "Spezza il dominio di broadcast ma non il dominio di collisione."
        },
        {
          "origKey": "d",
          "text": "Non spezza né il dominio di broadcast né il dominio di collisione."
        }
      ],
      "correctKey": "b",
      "refs": "IEEE 802.1D",
      "explanation": [
        "Un <strong>hub</strong> (Livello 1) ripete elettricamente ogni bit su tutte le porte, creando un unico grande dominio di collisione e un unico dominio di broadcast.",
        "Uno <strong>switch</strong> (Livello 2), invece, ha buffer sulle porte e inoltra le trame unicast solo sulla porta del destinatario: <strong>ogni singola porta dello switch costituisce un dominio di collisione separato</strong> (quindi spezza il dominio di collisione). Tuttavia, quando riceve una trama broadcast L2, lo switch la replica su tutte le porte, perciò <strong>non spezza il dominio di broadcast</strong> (a meno di configurare VLAN)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 73,
      "title": "Funzionamento dello Switch Ethernet",
      "topic": "collegamento",
      "question": "Uno Switch Ethernet:",
      "options": [
        {
          "origKey": "a",
          "text": "È un router in grado di operare su una LAN Ethernet."
        },
        {
          "origKey": "b",
          "text": "È un dispositivo multiporta store-and-forward in grado di ricevere trame da tutte le porte e di inoltrare le trame unicast selettivamente sulla porta corretta, e replicare le trame broadcast su tutte le porte."
        },
        {
          "origKey": "c",
          "text": "È un dispositivo multiporta store-and-forward in grado di ricevere trame da tutte le porte e scartarle se sono errate. Le trame corrette vengono re-inoltrate su tutte le porte per rispettare il dominio di broadcast."
        },
        {
          "origKey": "d",
          "text": "È un repeater multi-porta che copia le trame bit-a-bit su tutte le porte."
        }
      ],
      "correctKey": "b",
      "refs": "IEEE 802.1D",
      "explanation": [
        "Lo switch è un commutatore multiporta di Livello 2 che apprende gli indirizzi MAC associati alle proprie porte tramite <em>backward learning</em> (leggendo il MAC sorgente delle trame in ingresso). Quando riceve una trama unicast, legge il MAC destinazione e la inoltra <strong>solo</strong> sulla porta corrispondente; se il MAC è ignoto o è un indirizzo broadcast, la replica su tutte le altre porte."
      ],
      "wrongReasons": "Non è un router (Livello 3) ({{opt:a}}), non inoltra le trame unicast su tutte le porte ({{opt:c}}) e non è un repeater bit-a-bit di Livello 1 ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 74,
      "title": "Perché nel Wi-Fi (802.11) non si usa il Collision Detection (CD)",
      "topic": "collegamento",
      "question": "WiFi, ovvero 802.11, è un protocollo di livello MAC basato su CSMA/CA, ovvero Carrier Sense Multiple Access with Collision Avoidance. Per quale motivo non si utilizza Collision Detection come in Ethernet?",
      "options": [
        {
          "origKey": "a",
          "text": "Perché nelle reti wireless la potenza ricevuta è diversi ordini di grandezza inferiore alla potenza trasmessa, rendendo impossibile rilevare una seconda trasmissione."
        },
        {
          "origKey": "b",
          "text": "Non c'è una ragione specifica, è un accidente storico in quanto l'evoluzione dello standard 802.11 è stato principalmente dettato da logiche commerciali."
        },
        {
          "origKey": "c",
          "text": "Perché nelle reti wireless si possono avere al ricevitore segnali generati da più trasmettitori contemporaneamente e quindi non ha senso rilevare le collisioni."
        },
        {
          "origKey": "d",
          "text": "Perché nelle reti wireless non si può ascoltare il canale, come invece avviene su connessioni cablate in cui si ha un unico punto di accesso al canale."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.11",
      "explanation": [
        "Su un cavo coassiale Ethernet la potenza del segnale resta quasi costante, quindi una scheda che trasmette riesce a \"sentire\" se un'altra scheda trasmette contemporaneamente.",
        "Nelle trasmissioni radio (Wi-Fi), la potenza decade con il quadrato della distanza (<code>P<sub>ric</sub> = k · P<sub>tx</sub> / d<sup>2</sup></code>) e viene attenuata dall'ambiente (differenze anche di 10<sup>4</sup>–10<sup>6</sup> volte): l'antenna che sta trasmettendo è completamente \"assordata\" dal proprio stesso segnale e non può rilevare il debolissimo segnale di un'altra stazione distante. Inoltre esiste il problema del terminale nascosto."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 75,
      "title": "Come funziona il Collision Avoidance (CA) nel Wi-Fi",
      "topic": "collegamento",
      "question": "WiFi, ovvero 802.11, è un protocollo di livello MAC basato su CSMA/CA, ovvero Carrier Sense Multiple Access with Collision Avoidance, dove CA significa che:",
      "options": [
        {
          "origKey": "a",
          "text": "Esiste una procedura di risoluzione delle contese basato su una procedura di backoff che evita le collisioni, questa procedura viene svolta periodicamente, precisamente ogni TXOP secondi."
        },
        {
          "origKey": "b",
          "text": "Viene implementato un handshake preliminare per prenotare il canale e eliminare le collisioni."
        },
        {
          "origKey": "c",
          "text": "Quando le stazioni rilevano il canale occupato restano in ascolto e, quando il canale si libera, effettuano una procedura di backoff estraendo un numero casuale di slot in una data finestra di contesa. Ciascuna stazione fa il countdown degli slot e trasmette quando raggiunge 0, il countdown si interrompe se nel frattempo il canale diventa occupato."
        },
        {
          "origKey": "d",
          "text": "Quando le stazioni rilevano il canale occupato restano in ascolto e, quando il canale si libera, estraggono una variabile casuale per decidere se trasmettere immediatamente oppure rimandare la trasmissione in un tempo futuro scelto a caso (p-persistenza)."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.11 DCF",
      "explanation": [
        "Non potendo rilevare le collisioni in corso, il Wi-Fi le previene (<strong>CSMA/CA</strong>): se il canale è occupato, le stazioni attendono la fine del dialogo (incluso l'ACK) più un tempo <strong>DIFS</strong>. Poi ciascuna estrae un numero casuale di slot nella finestra di contesa <em>CW</em> e avvia un conto alla rovescia (<em>backoff</em>). Chi arriva prima a 0 trasmette; le altre stazioni <strong>congelano</strong> il proprio contatore non appena sentono il canale tornare occupato e lo riprenderanno alla finestra successiva."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 76,
      "title": "Inoltro di un datagramma tra due schede Ethernet di un router",
      "topic": "rete",
      "question": "Un router è dotato di due interfacce di rete, entrambe Ethernet, ma su due schede (NIC) diverse, chiamate A e B per semplicità. Quando un datagramma è inoltrato da A a B:",
      "options": [
        {
          "origKey": "a",
          "text": "Il router estrae il datagramma IP dalla trama Ethernet della scheda A memorizzando l'indirizzo MAC sorgente (chiamato MAC-IN). Quindi modifica TTL, ricalcola il Checksum e incapsula il datagramma IP nella trama Ethernet della scheda B mettendo come indirizzo MAC sorgente MAC-IN e come indirizzo MAC destinazione quello del next-hop selezionato."
        },
        {
          "origKey": "b",
          "text": "Il router estrae il datagramma IP dalla trama Ethernet della scheda A memorizzando l'indirizzo MAC sorgente (chiamato MAC-IN). Quindi modifica TTL, ricalcola il Checksum e incapsula il datagramma IP nella trama Ethernet della scheda B, mettendo come indirizzo MAC sorgente MAC-IN e come indirizzo MAC destinazione quello del destinatario finale del datagramma."
        },
        {
          "origKey": "c",
          "text": "Il router estrae il datagramma IP dalla trama Ethernet della scheda A (gli indirizzi MAC sono eliminati). In seguito decrementa TTL e, se TTL > 0, incapsula il datagramma IP nella trama Ethernet della scheda B, mettendo come indirizzo MAC sorgente il proprio e come indirizzo MAC destinazione quello del next-hop selezionato e ricalcola il checksum del livello MAC."
        },
        {
          "origKey": "d",
          "text": "Il router estrae il datagramma IP dalla trama Ethernet della scheda A (gli indirizzi MAC sono eliminati). In seguito controlla TTL senza modificarlo, se TTL > 0, ricalcola il Checksum e incapsula il datagramma IP nella trama Ethernet della scheda B, se invece TTL = 0 consegna il datagramma ai livelli superiori perché è arrivato a destinazione."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 791, RFC 1812",
      "explanation": [
        "Gli indirizzi MAC hanno validità strettamente locale al singolo collegamento. Quando un pacchetto attraversa un router dalla scheda A alla scheda B:<br>1. Il router decapsula il datagramma IP scartando la vecchia trama Ethernet (e i vecchi MAC).<br>2. Decrementa di 1 il campo <strong>TTL</strong> (e aggiorna il checksum IP); se <code>TTL = 0</code> scarta il pacchetto e manda un errore ICMP.<br>3. Re-incapsula il datagramma in una <strong>nuova trama Ethernet</strong> sulla scheda B usando come <strong>MAC sorgente</strong> l'indirizzo della propria scheda B e come <strong>MAC destinazione</strong> l'indirizzo del <strong>next-hop</strong> (il router successivo o l'host finale se è nella stessa subnet)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 77,
      "title": "Come il ricevitore TCP attua il controllo di flusso",
      "topic": "trasporto_app",
      "question": "In che modo un ricevitore TCP implementa il controllo di flusso (per quanto gli compete)?",
      "options": [
        {
          "origKey": "a",
          "text": "Inviando segmenti vuoti con il flag RWND settato e nel campo Dimension la quantità di spazio ancora libero nel buffer di ricezione."
        },
        {
          "origKey": "b",
          "text": "Inviando nel campo RWND degli ACK validi la quantità di spazio ancora libero nel buffer di ricezione in numero di segmenti."
        },
        {
          "origKey": "c",
          "text": "Inviando nel campo RWND la quantità di dati attualmente memorizzata nel buffer di ricezione."
        },
        {
          "origKey": "d",
          "text": "Inviando nel campo RWND degli ACK validi la quantità di spazio (espresso in byte) ancora libero nel buffer di ricezione."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9293",
      "explanation": [
        "TCP lavora orientato al flusso di <strong>byte</strong>. In ogni segmento di riscontro (<code>ACK</code>), il ricevitore compila il campo a 16 bit <em>Window</em> (<code>RWND</code>) indicando esattamente <strong>quanti byte di spazio libero</strong> sono rimasti nel proprio buffer di ricezione, informando il mittente su quanti altri byte può ancora inviare in sicurezza."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 78,
      "title": "Record DNS di tipo MX",
      "topic": "trasporto_app",
      "question": "In un Record di tipo MX del DNS (Domain Name System):",
      "options": [
        {
          "origKey": "a",
          "text": "Il campo name è il nome del dominio; il campo value è il nome dell'host che ospita il server di posta elettronica per quel dominio."
        },
        {
          "origKey": "b",
          "text": "Il campo name è il nome alias dell'host; il campo value è il nome autentico o 'canonico'."
        },
        {
          "origKey": "c",
          "text": "Il campo name è il nome del dominio; il campo value è l'indirizzo IP del server TLD o comunque del server gerarchicamente superiore nel DNS."
        },
        {
          "origKey": "d",
          "text": "Il campo name è il nome del dominio; il campo value è il nome del server di competenza per quel dominio."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 1035",
      "explanation": [
        "Quando invii un'email a <code>utente@unibs.it</code>, il tuo server di posta deve sapere qual è il server email responsabile per <code>unibs.it</code>. Interroga quindi il DNS chiedendo il <strong>Record MX</strong> (<em>Mail Exchange</em>): il campo <code>name</code> è il dominio (<code>unibs.it</code>) e il campo <code>value</code> restituisce il nome canonico dell'host che gestisce la posta di quel dominio (es. <code>mail.unibs.it</code>, che verrà poi tradotto in IP tramite un Record <code>A</code>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 79,
      "title": "Valori della MTU (formulazione estesa)",
      "topic": "rete",
      "question": "Quali valori può assumere la MTU?",
      "options": [
        {
          "origKey": "a",
          "text": "Qualsiasi valore sia deciso dal protocollo di livello Data-Link. Tuttavia il valore minimo è 64 B (per permettere a CSMA/CD di Ethernet di funzionare), lo standard di fatto è 1538 B (MTU di Ethernet)."
        },
        {
          "origKey": "b",
          "text": "Il valore minimo è 576 B, ma tutti i protocolli Data-Link negoziano con il livello IP per trovare il valore ottimo."
        },
        {
          "origKey": "c",
          "text": "Qualsiasi valore sia deciso dal protocollo di livello Data-Link. Tuttavia il valore minimo è 576 B e lo standard di fatto è 1500 B (MTU di Ethernet)."
        },
        {
          "origKey": "d",
          "text": "Qualsiasi valore sia deciso dal protocollo di livello Data-Link. Tuttavia il valore minimo è 64 B (per permettere a CSMA/CD di Ethernet di funzionare), lo standard di fatto è 1500 B (MTU di Ethernet)."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 791, IEEE 802.3",
      "explanation": [
        "La <strong>MTU</strong> (<em>Maximum Transmission Unit</em>) è fissata dalla tecnologia di Livello 2 utilizzata (ad esempio Wi-Fi ammette oltre 2000 byte, Ethernet 1500 byte). In Internet, il valore minimo garantito per la ricezione/riassemblaggio di datagrammi IPv4 è <strong>576 byte</strong> (RFC 791), mentre lo <strong>standard di fatto</strong> su cui si basano tutti i sistemi è <strong>1500 byte</strong> (la MTU di Ethernet)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 80,
      "title": "Funzione che NON appartiene al livello Data Link",
      "topic": "collegamento",
      "question": "Quali tra le seguenti funzioni NON rientra tra quelle svolte dal livello DL (Data-Link)?",
      "options": [
        {
          "origKey": "a",
          "text": "Il livello DL opera un controllo di flusso, per evitare di causare un overflow nel buffer di un ricevitore lento a smaltire le trame inviate da un trasmettitore veloce."
        },
        {
          "origKey": "b",
          "text": "Per apparire ai livelli superiori come un data pipe (\"tubo di dati\"), il livello DL opera il riordino dei bit arrivati fuori sequenza prima della consegna della trama al livello di rete."
        },
        {
          "origKey": "c",
          "text": "Il livello DL coordina l'accesso ad un mezzo broadcast condiviso, attraverso specifici protocolli MAC (Medium Access Control)."
        },
        {
          "origKey": "d",
          "text": "Il livello DL si occupa del framing, cioè la delimitazione delle diverse unità dati (trame), per poterle distinguere temporalmente le une dagli altri."
        }
      ],
      "correctKey": "b",
      "refs": "Livello Data Link",
      "explanation": [
        "Su un collegamento fisico punto-punto o broadcast, i bit viaggiano in sequenza sul mezzo trasmissivo e <strong>non possono arrivare fuori ordine</strong> (il riordino riguarda semmai i segmenti IP/TCP su percorsi diversi a livello superiore, non i singoli bit a Livello 2). Le altre tre opzioni — controllo di flusso ({{opt:a}}), accesso al mezzo condiviso MAC ({{opt:c}}) e framing ({{opt:d}}) — sono invece le funzioni fondamentali del livello Data Link."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 81,
      "title": "Caratteristiche e compiti del protocollo ICMP",
      "topic": "rete",
      "question": "Il protocollo ICMP (Internet Control Message Protocol):",
      "options": [
        {
          "origKey": "a",
          "text": "È un protocollo di supporto a IP i cui messaggi, incapsulati direttamente in un datagramma IP, servono a notificare a una interfaccia IP stati e condizioni della rete come ad esempio: la raggiungibilità di una interfaccia o di una sottorete, condizioni di errore come TTL (Time To Live) = 0, o la mancanza di un percorso valido verso l'host selezionato dall'indirizzo IP (no route to host)."
        },
        {
          "origKey": "b",
          "text": "È un protocollo di supporto a IP i cui messaggi, veicolati attraverso una connessione TCP per affidabilità, servono a notificare a un host stati e condizioni della rete come ad esempio: la raggiungibilità di una interfaccia o di una sottorete, condizioni di errore come TTL (Time To Live) = 0, o la mancanza di un percorso valido verso l'host selezionato dall'indirizzo IP (no route to host)."
        },
        {
          "origKey": "c",
          "text": "È un protocollo applicativo di supporto a IP i cui messaggi, incapsulati in un datagramma UDP, consentono di realizzare i comandi \"ping\" e \"traceroute\" per scoprire l'esistenza di un host con un dato indirizzo IP e il percorso effettuato per raggiungerlo."
        },
        {
          "origKey": "d",
          "text": "È un protocollo applicativo di supporto a IP i cui messaggi, incapsulati in un datagramma UDP, servono a notificare a una interfaccia IP stati e condizioni della rete come ad esempio: la raggiungibilità di una interfaccia o di una sottorete, condizioni di errore come TTL (Time To Live) = 0, o la mancanza di un percorso valido verso l'host selezionato dall'indirizzo IP (no route to host)."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 792",
      "explanation": [
        "<strong>ICMP</strong> è il compagno inseparabile di IP al <strong>Livello 3 (Rete)</strong>: non usa TCP né UDP perché deve effettuare segnalazioni e misure direttamente dentro la rete (anche nei router). I suoi messaggi sono incapsulati direttamente dentro i datagrammi IP (con campo <code>Protocol = 1</code>) e segnalano eventi come <em>Echo Request/Reply</em> (<code>ping</code>), <em>Time Exceeded</em> (<code>TTL = 0</code>, usato da <code>traceroute</code>) e <em>Destination Unreachable</em>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 82,
      "title": "Con cosa inizia una trama Ethernet",
      "topic": "collegamento",
      "question": "Una trama Ethernet inizia con:",
      "options": [
        {
          "origKey": "a",
          "text": "Indirizzo MAC destinazione che è il primo campo che devono leggere gli switch per inoltrare la trama."
        },
        {
          "origKey": "b",
          "text": "Il campo CRC per controllare la correttezza della trama e scartarla se contiene errori."
        },
        {
          "origKey": "c",
          "text": "Un preambolo di <code>10101010...</code> usato per sincronizzare il ricevitore terminato dal byte <code>10101011</code> che indica l'inizio della trama vera e propria."
        },
        {
          "origKey": "d",
          "text": "Indirizzo MAC sorgente per capire da chi proviene la trama e gestirla correttamente."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.3",
      "explanation": [
        "Poiché Ethernet nasce su canali condivisi in cui tra una trama e l'altra c'è silenzio, la scheda ricevente deve prima sincronizzare il proprio clock con quello del trasmettitore. Per questo la trama inizia con un <strong>Preambolo</strong> (7 byte formati dalla sequenza alternata <code>10101010</code>) seguito dallo <strong>Start of Frame Delimiter (SFD)</strong>, un byte <code>10101011</code> i cui due bit finali <code>11</code> segnalano: \"ora inizia l'indirizzo MAC di destinazione\"."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 83,
      "title": "Portata di un datagramma Limited Broadcast (255.255.255.255)",
      "topic": "rete",
      "question": "Quali destinazioni verranno raggiunte da un datagramma con indirizzo destinazione <code>255.255.255.255</code> (limited broadcast) generato da un host che insiste sulla subnet <code>78.91.2.0/23</code>?",
      "options": [
        {
          "origKey": "a",
          "text": "Tutti i nodi di Internet, limitatamente agli indirizzi unicast pubblici."
        },
        {
          "origKey": "b",
          "text": "Tutti i nodi della subnet, limitatamente a quelli con funzioni di server (DHCP, DNS, ecc.)."
        },
        {
          "origKey": "c",
          "text": "Gli stessi nodi che sarebbero raggiunti da un datagramma con indirizzo <code>78.91.255.255</code>."
        },
        {
          "origKey": "d",
          "text": "Gli stessi nodi che sarebbero raggiunti da un datagramma con indirizzo <code>78.91.3.255</code>."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 919, RFC 922",
      "explanation": [
        "L'indirizzo <code>255.255.255.255</code> (<em>Limited Broadcast</em>) raggiunge <strong>tutti e soli gli host della sottorete locale</strong> (i router non lo inoltrano mai verso l'esterno).",
        "Calcoliamo l'indirizzo di <em>Direct Broadcast</em> della subnet <code>78.91.2.0/23</code>:<br>• Il prefisso <code>/23</code> fissa i primi 23 bit (<code>8 + 8 + 7</code>). Il terzo ottetto è <code>2<sub>10</sub> = 00000010<sub>2</sub></code>: i primi 7 bit (<code>0000001</code>) appartengono alla rete, mentre l'ultimo bit del terzo ottetto e tutti gli 8 bit del quarto ottetto appartengono all'HostID.<br>• Ponendo tutti i 9 bit dell'HostID a 1, il terzo ottetto diventa <code>00000011<sub>2</sub> = 3<sub>10</sub></code> e il quarto ottetto diventa <code>11111111<sub>2</sub> = 255<sub>10</sub></code>, ottenendo <strong><code>78.91.3.255</code></strong>, che raggiunge esattamente gli stessi nodi della subnet."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 84,
      "title": "Numero di livelli nell'architettura protocollare di Internet",
      "topic": "fondamenti",
      "question": "Il numero di livelli nell'architettura protocollare di Internet:",
      "options": [
        {
          "origKey": "a",
          "text": "È variabile tra 3 e 6 a seconda dell'applicazione che si usa."
        },
        {
          "origKey": "b",
          "text": "È pari a 5: Fisico, Collegamento, Rete, Trasporto, Applicazione."
        },
        {
          "origKey": "c",
          "text": "È pari a 7: Fisico, Collegamento, Rete, Trasporto, Sessione, Presentazione, Applicazione."
        },
        {
          "origKey": "d",
          "text": "È variabile tra 3 e 5 a seconda del mezzo trasmissivo usato."
        }
      ],
      "correctKey": "b",
      "refs": "Architettura TCP/IP",
      "explanation": [
        "A differenza del modello teorico ISO/OSI che ha 7 livelli, l'architettura protocollare di Internet (TCP/IP) è strutturata su <strong>5 livelli</strong>: <strong>Fisico</strong>, <strong>Collegamento</strong> (Data Link), <strong>Rete</strong> (IP), <strong>Trasporto</strong> (TCP/UDP) e <strong>Applicazione</strong> (che ingloba le funzioni di Sessione e Presentazione)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 85,
      "title": "Funzionamento del protocollo CSMA p-persistente",
      "topic": "collegamento",
      "question": "Un protocollo CSMA (Carrier Sense Multiple Access) p-persistente, quando ha una trama da trasmettere, ascolta il canale e se lo trova occupato:",
      "options": [
        {
          "origKey": "a",
          "text": "Trasmette la trama con probabilità p e con probabilità 1−p la scarta non avendo un buffer di attesa per le trasmissioni."
        },
        {
          "origKey": "b",
          "text": "Attende che il canale si liberi e quando il canale è libero trasmette la trama con probabilità p e con probabilità 1−p allo slot successivo, essendo un protocollo slotted."
        },
        {
          "origKey": "c",
          "text": "Trasmette la trama in ogni caso per forzare una collisione e poter attivare l'algoritmo di backoff esponenziale che risolve la contesa."
        },
        {
          "origKey": "d",
          "text": "Attende che il canale si liberi e quando il canale si libera trasmette la trama con probabilità p, viceversa, con probabilità 1−p rimanda la trasmissione per un tempo t' molto maggiore del tempo di trasmissione della trama."
        }
      ],
      "correctKey": "b",
      "refs": "Protocolli MAC CSMA",
      "explanation": [
        "Nel <strong>CSMA p-persistente</strong> (usato su canali slottizzati), se una stazione vuole trasmettere e sente il canale occupato, resta in ascolto finché il canale non si libera. Appena il canale diventa libero, per evitare che tutte le stazioni in attesa trasmettano insieme collidendo (come accade nell'1-persistente), la stazione trasmette nello slot corrente con probabilità <strong>p</strong> e rimanda allo slot successivo con probabilità <strong>1 − p</strong> (ripetendo il tentativo se il canale è ancora libero)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 86,
      "title": "Significato della capacità C di un canale AWGN (Shannon)",
      "topic": "fondamenti",
      "question": "Quale di queste affermazioni è corretta?",
      "options": [
        {
          "origKey": "a",
          "text": "La capacità C di un canale AWGN, in base alla formula di Shannon, individua il massimo rate R per il quale è teoricamente possibile occupare una banda B del canale trasmissivo pari a R."
        },
        {
          "origKey": "b",
          "text": "La capacità C di un canale AWGN, in base alla formula di Shannon, individua il massimo rate R per il quale è possibile trasmettere informazione senza errori."
        },
        {
          "origKey": "c",
          "text": "Il rate R di una trasmissione è pari alla capacità C del canale quando la banda B del canale trasmissivo è utilizzata interamente."
        },
        {
          "origKey": "d",
          "text": "Il rate R di una trasmissione deve essere maggiore della capacità C di un canale AWGN, in base alla formula di Shannon, per garantire che esista un meccanismo per il recupero dei bit in ricezione senza errori."
        }
      ],
      "correctKey": "b",
      "refs": "Teorema di Shannon-Hartley",
      "explanation": [
        "È la formulazione specifica per il canale AWGN dello stesso principio della Domanda 49: la capacità <code>C = B log<sub>2</sub>(S/N + 1)</code> rappresenta l'estremo superiore alla velocità di trasmissione <em>R</em> (bit/s) al di sotto del quale è teoricamente possibile trasmettere dati con probabilità d'errore nulla."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 87,
      "title": "Quando un protocollo MAC si dice instabile",
      "topic": "collegamento",
      "question": "A livello MAC un protocollo si dice instabile quando:",
      "options": [
        {
          "origKey": "a",
          "text": "All'aumentare del numero di stazioni presenti sul canale, il traffico offerto viene bloccato dal protocollo di accesso al canale."
        },
        {
          "origKey": "b",
          "text": "All'aumentare del traffico offerto dalle stazioni al canale, il traffico smaltito dal canale stesso subisce delle oscillazioni tra un massimo e un minimo (instabilità)."
        },
        {
          "origKey": "c",
          "text": "All'aumentare del traffico offerto dalle stazioni al canale, oltre una soglia che definisce il throughput massimo, il traffico smaltito dal canale stesso diminuisce fino ad azzerarsi."
        },
        {
          "origKey": "d",
          "text": "All'aumentare del traffico smaltito dal canale, le stazioni non riescono ad offrire abbastanza traffico per il corretto funzionamento del protocollo di accesso."
        }
      ],
      "correctKey": "c",
      "refs": "Stabilità dei protocolli ad accesso casuale",
      "explanation": [
        "Nei protocolli ad accesso casuale come <strong>Aloha</strong>, <strong>Slotted Aloha</strong> e <strong>CSMA 1-persistente</strong>, quando il carico offerto <em>G</em> supera una certa soglia critica (es. <em>G = 0.5</em> per Aloha puro), il numero di collisioni esplode. Le stazioni sono costrette a ritrasmettere continuamente, generando ancora più traffico e facendo crollare il <strong>throughput</strong> (traffico smaltito <em>S</em>) verso zero (collasso della rete). Un protocollo con questo comportamento si definisce <strong>instabile</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 88,
      "title": "Ruolo della rotta di default (0.0.0.0/0) nella tabella di routing",
      "topic": "rete",
      "question": "In una tabella di routing, la rotta di default con destinazione <code>0.0.0.0/0</code>:",
      "options": [
        {
          "origKey": "a",
          "text": "Indica il next-hop per i pacchetti con destinazione non direttamente raggiungibile."
        },
        {
          "origKey": "b",
          "text": "Indica il next-hop da utilizzare nel caso il default router sia temporaneamente irraggiungibile."
        },
        {
          "origKey": "c",
          "text": "Indica il next-hop per i datagrammi di un host con indirizzo sorgente in una rete locale che vanno instradati verso il resto di Internet."
        },
        {
          "origKey": "d",
          "text": "Indica il next-hop per i datagrammi il cui indirizzo di destinazione non è compreso nel campo destinazione di nessun'altra riga della tabella di routing."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 1812",
      "explanation": [
        "La tabella di routing viene consultata cercando la corrispondenza più specifica (<em>longest prefix match</em>) con l'IP di destinazione. La riga <code>0.0.0.0/0</code> (maschera a zero bit) fa <em>match</em> con qualsiasi indirizzo IP: viene usata come \"ultima spiaggia\" (<strong>default gateway</strong>) per inoltrare tutti i pacchetti diretti verso reti non esplicitamente elencate nelle righe più specifiche."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 89,
      "title": "Quando avviene la consegna indiretta di un datagramma IP",
      "topic": "rete",
      "question": "La consegna indiretta di un datagramma IP avviene quando:",
      "options": [
        {
          "origKey": "a",
          "text": "La sorgente non conosce l'indirizzo IP della destinazione ma solo il suo nome (Fully Qualified Domain Name - FQDN)."
        },
        {
          "origKey": "b",
          "text": "A livello IP è necessario l'intervento di uno o più router per inoltrare il datagramma."
        },
        {
          "origKey": "c",
          "text": "Ci sono più di due link di trasmissione tra la sorgente e la destinazione e quindi è necessario fare una commutazione."
        },
        {
          "origKey": "d",
          "text": "Ci sono uno o più switch Ethernet tra la sorgente e la destinazione."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 791",
      "explanation": [
        "Quando l'host sorgente verifica (tramite la Subnet Mask) che l'IP di destinazione <strong>non appartiene alla propria sottorete</strong>, non può consegnarlo direttamente: lo invia al proprio router (<em>default gateway</em>), il quale lo inoltrerà di hop in hop attraverso uno o più router fino alla subnet finale (<strong>consegna indiretta</strong>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 90,
      "title": "Assegnazione dell'HostID (Interface ID) in IPv6",
      "topic": "rete",
      "question": "Come viene assegnata la parte di indirizzo di HostID in IPv6:",
      "options": [
        {
          "origKey": "a",
          "text": "È fissato dal produttore, tanto gli indirizzi sono talmente tanti (2<sup>128</sup>) che non ci sono rischi di duplicazione."
        },
        {
          "origKey": "b",
          "text": "Dal DNS IPv6."
        },
        {
          "origKey": "c",
          "text": "Devono essere configurati a mano (per adesso) perché IPv6 è ancora poco diffuso."
        },
        {
          "origKey": "d",
          "text": "In modo autonomo dall'Host a partire dal MAC address dell'interfaccia a cui si assegna l'indirizzo IPv6."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 4291, RFC 4862 (SLAAC)",
      "explanation": [
        "Un indirizzo IPv6 è lungo <strong>128 bit</strong>, diviso esattamente a metà: 64 bit per la rete e <strong>64 bit per l'Interface ID (HostID)</strong>. Tramite il meccanismo standard <strong>SLAAC</strong> (<em>Stateless Address Autoconfiguration</em>, RFC 4862), l'host può generare autonomamente questi 64 bit partendo dai 48 bit del proprio <strong>indirizzo MAC</strong> (formato <em>Modified EUI-64</em>, inserendo i 16 bit fissi <code>FFFE</code> al centro), riducendo così la necessità di un server DHCP."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 91,
      "title": "Definizione formale di Protocollo",
      "topic": "fondamenti",
      "question": "Un protocollo:",
      "options": [
        {
          "origKey": "a",
          "text": "Definisce la sintassi, la temporizzazione e la semantica dei messaggi che si scambiano due entità di reti di livelli adiacenti (ad esempio N ed N−1) attraverso le primitive dei protocolli."
        },
        {
          "origKey": "b",
          "text": "Definisce i formati e i campi dei messaggi che si scambiano due calcolatori per comunicare tra loro."
        },
        {
          "origKey": "c",
          "text": "Definisce la sintassi, la temporizzazione e la semantica dei messaggi che si scambiano due entità di pari livello in due sistemi collegati direttamente attraverso dei mezzi trasmissivi."
        },
        {
          "origKey": "d",
          "text": "Definisce la sintassi, la temporizzazione e la semantica dei messaggi che si scambiano entità di pari livello in sistemi collegati (anche indirettamente) attraverso dei mezzi trasmissivi."
        }
      ],
      "correctKey": "d",
      "refs": "Architetture protocollari",
      "explanation": [
        "Un <strong>protocollo</strong> regola la comunicazione orizzontale tra <strong>due entità di pari livello</strong> (es. TCP del client e TCP del server, anche se separati da decine di router) definendo:<br>• <strong>Sintassi:</strong> formato e struttura dei campi dei messaggi.<br>• <strong>Semantica:</strong> significato di ciascun campo e azioni da intraprendere.<br>• <strong>Temporizzazione:</strong> ordine dei messaggi e gestione dei timeout.<br><em>(Tra livelli adiacenti dello stesso sistema non si usano protocolli, ma chiamate a funzioni tramite interfacce/SAP).</em>"
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 92,
      "title": "Perché FTP si differenzia dagli altri protocolli applicativi",
      "topic": "trasporto_app",
      "question": "Perché il protocollo FTP (File Transfer Protocol) si differenzia dagli altri protocolli di livello applicativo di Internet?",
      "options": [
        {
          "origKey": "a",
          "text": "È stateless, come HTTP, ma pur usando due connessioni TCP in parallelo può trasferire un solo file alla volta."
        },
        {
          "origKey": "b",
          "text": "È stateful e usa una connessione TCP sulla porta 21 del server per i comandi (connessione di controllo) e una connessione TCP con HTTP per trasferire i file (oggetti del trasferimento)."
        },
        {
          "origKey": "c",
          "text": "È stateless, ma usando connessioni TCP separate, una per ciascun file, per consentire trasferimenti in parallelo e non bloccare il funzionamento in caso di trasferimento di un file molto grosso."
        },
        {
          "origKey": "d",
          "text": "È stateful e usa due connessioni TCP separate: una per i comandi (connessioni di controllo) e una per il trasferimento dei file."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 959",
      "explanation": [
        "A differenza di HTTP o DNS che sono <em>stateless</em>, <strong>FTP</strong> è l'unico protocollo applicativo classico di Internet ad essere <strong>stateful</strong>: il server mantiene memoria dello stato della sessione utente (cartella corrente, autenticazione). Inoltre apre <strong>due connessioni TCP distinte</strong> (<em>out-of-band control</em>): una permanente per i comandi di controllo (porta <code>21</code>) e una dedicata esclusivamente al trasferimento dei dati/file (porta <code>20</code> in modalità attiva)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 93,
      "title": "Record DNS di tipo NS",
      "topic": "trasporto_app",
      "question": "In un record di tipo NS del DNS (Domain Name System):",
      "options": [
        {
          "origKey": "a",
          "text": "Il campo name è il nome alias dell'host; il campo value è il nome autentico o 'canonico'."
        },
        {
          "origKey": "b",
          "text": "Il campo name è il nome del dominio; il campo value è il nome dell'host che ospita il server di competenza per quel dominio."
        },
        {
          "origKey": "c",
          "text": "Il campo name è il nome del dominio; il campo value è l'indirizzo IP del server TLD o comunque del server gerarchicamente superiore nel DNS."
        },
        {
          "origKey": "d",
          "text": "Il campo name è il nome del server DNS di competenza; il campo value è il nome del dominio cercato."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 1035",
      "explanation": [
        "Il <strong>Record NS</strong> (<em>Name Server</em>) serve a delegare la gerarchia DNS: indica qual è il server autorevole per un determinato dominio. Nel record, <code>name</code> è il nome del dominio (es. <code>unibs.it</code>) e <code>value</code> è il nome dell'host del server DNS autoritativo che lo gestisce (es. <code>dns.unibs.it</code>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 94,
      "title": "Rilevamento errori a livello Data Link",
      "topic": "collegamento",
      "question": "Il livello Data-Link implementa spesso una funzione di rilevamento errori. In che modo?",
      "options": [
        {
          "origKey": "a",
          "text": "Il trasmettitore applica una funzione ai byte della trama e ottiene un numero, chiamato checksum, che viene inviato al ricevitore su un canale sicuro. Quando riceve anche la trama, il ricevitore effettua lo stesso calcolo e accetta la trama solamente se il risultato calcolato localmente è uguale al valore sul canale sicuro."
        },
        {
          "origKey": "b",
          "text": "Implementando un codice a correzione degli errori che consente al ricevitore di correggere eventuali errori sui bit."
        },
        {
          "origKey": "c",
          "text": "Calcolando al trasmettitore un bit di parità per ogni byte trasmesso. Il ricevitore accetta la trama solo se tutti i bit di parità sono corretti."
        },
        {
          "origKey": "d",
          "text": "Il trasmettitore applica una funzione ai byte della trama e ottiene un numero, chiamato checksum, che viene incluso nell'intestazione. Il ricevitore effettua lo stesso calcolo e accetta la trama solamente se il risultato calcolato localmente è uguale al valore del campo checksum."
        }
      ],
      "correctKey": "d",
      "refs": "IEEE 802.3",
      "explanation": [
        "Per accorgersi se il canale fisico ha alterato qualche bit, il trasmettitore L2 calcola un codice di controllo (<strong>checksum / CRC</strong>) sull'intera trama e lo inserisce nella trama stessa (nell'header o nel trailer FCS). Il ricevitore ripete identicamente il calcolo sui bit ricevuti: se il risultato coincide con il checksum ricevuto, la trama viene accettata; altrimenti viene scartata."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 95,
      "title": "Campi sempre presenti in una trama Ethernet",
      "topic": "collegamento",
      "question": "Nell'intestazione di una trama Ethernet si trovano sempre:",
      "options": [
        {
          "origKey": "a",
          "text": "Indirizzo MAC destinazione, Indirizzo MAC sorgente, specifica dell'encoding usato a livello fisico."
        },
        {
          "origKey": "b",
          "text": "Indirizzo MAC destinazione, ma non l'indirizzo MAC sorgente che è inutile essendoci l'indirizzo IP."
        },
        {
          "origKey": "c",
          "text": "Indirizzo MAC destinazione, indirizzo MAC sorgente, CRC su 32 bit."
        },
        {
          "origKey": "d",
          "text": "Indirizzo MAC destinazione, indirizzo MAC sorgente, indirizzo IP destinazione, indirizzo IP sorgente."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.3",
      "explanation": [
        "Ogni trama Ethernet (Livello 2) trasporta nell'intestazione l'<strong>indirizzo MAC di destinazione</strong> (6 byte) e l'<strong>indirizzo MAC sorgente</strong> (6 byte), e termina in coda con il campo <strong>Checksum (CRC a 32 bit)</strong> per il controllo degli errori."
      ],
      "wrongReasons": "Gli indirizzi IP ({{opt:d}}) stanno dentro il datagramma incapsulato nel payload, non nell'header Ethernet.",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 96,
      "title": "Perché Internet ha 5 livelli invece dei 7 di ISO/OSI",
      "topic": "fondamenti",
      "question": "Internet ha una architettura protocollare definita su 5 livelli: fisico, data-link, rete, trasporto, applicazione. Scegliere l'affermazione che spiega meglio questa scelta.",
      "options": [
        {
          "origKey": "a",
          "text": "È il numero massimo di annidamento ammesso dai sistemi operativi degli host, che non sono in grado di gestire un numero superiore di incapsulamenti."
        },
        {
          "origKey": "b",
          "text": "È il numero di livelli del modello ISO/OSI, che è uno standard internazionale; inizialmente ISO/OSI aveva 7 livelli, ma con l'avvento di internet sono stati ridotti a 5."
        },
        {
          "origKey": "c",
          "text": "È un compromesso che lascia al livello applicazione tutti i compiti relativi alla gestione sintattica dei dati, dalla sincronizzazione dei flussi, alla rappresentazione delle immagini e così via."
        },
        {
          "origKey": "d",
          "text": "È il numero che deriva da una procedura di ottimizzazione effettuata a partire dai 7 livelli del modello ISO/OSI."
        }
      ],
      "correctKey": "c",
      "refs": "Architettura TCP/IP vs ISO/OSI",
      "explanation": [
        "Nell'architettura TCP/IP mancano i livelli <strong>Sessione</strong> (sincronizzazione dei flussi audio/video) e <strong>Presentazione</strong> (codifica e rappresentazione dei formati dati) presenti nel modello ISO/OSI. Tutte queste responsabilità sono state accorpate direttamente nel livello <strong>Applicazione</strong>, rendendo la rete più semplice ma obbligando le singole app (es. Teams, VLC, browser) a gestire internamente i formati dati."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 97,
      "title": "Funzionamento di un server Proxy HTTP (Web Cache)",
      "topic": "trasporto_app",
      "question": "Un server Proxy HTTP:",
      "options": [
        {
          "origKey": "a",
          "text": "Intercetta le richieste dei client (browser), verifica che le richieste siano valide e in caso positivo le inoltra al server specificato nella richiesta, se no le scarta."
        },
        {
          "origKey": "b",
          "text": "Intercetta le richieste dei client (browser) che sono stati configurati per usare il Proxy e se ha risposta valida nella cache risponde direttamente, altrimenti inoltra la richiesta al server specificato nella richiesta, intercetta la risposta e infine la invia al client."
        },
        {
          "origKey": "c",
          "text": "È una forma evoluta di NAT (Network Address Translation) che consente un'efficienza maggiore nella traduzione degli indirizzi perché conosce già il protocollo usato, inoltre può fare caching delle risposte per riusarle se necessario."
        },
        {
          "origKey": "d",
          "text": "Intercetta le richieste dei client con indirizzi IP privati e modifica l'indirizzo IP del client in modo che la richiesta possa essere inoltrata su internet, intercetta poi la risposta e la inoltra al client con l'indirizzo privato."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 9110, RFC 9111",
      "explanation": [
        "Un <strong>Proxy HTTP</strong> funge da intermediario e memoria cache locale per una rete (es. un'università o un'azienda): quando un client richiede una pagina Web, il proxy controlla se ne possiede già una copia aggiornata nella propria cache (usando eventualmente un <code>GET</code> condizionale). Se ce l'ha, la restituisce subito risparmiando banda verso Internet; altrimenti la scarica dal server originale, la salva in cache e la consegna al client."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 98,
      "title": "Vantaggio principale delle connessioni HTTP persistenti",
      "topic": "trasporto_app",
      "question": "L'uso di connessioni persistenti rende HTTP più efficiente?",
      "options": [
        {
          "origKey": "a",
          "text": "Sì, perché si possono usare connessioni in parallelo per inviare le richieste successive senza aspettare la fine di un trasferimento per iniziare il successivo."
        },
        {
          "origKey": "b",
          "text": "No, l'efficienza di HTTP è indipendente dal numero di connessioni aperte o dalla loro persistenza, ma dipende solamente dall'RTT che se è grande rallenta il trasferimento dei dati."
        },
        {
          "origKey": "c",
          "text": "No, l'uso di connessioni persistenti non è legato alle prestazioni ma alla sicurezza in rete."
        },
        {
          "origKey": "d",
          "text": "Sì, perché si evita il costo di un three-way-handshake per ogni oggetto da trasferire dato che si trasferiscono più oggetti sulla stessa connessione TCP."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9112",
      "explanation": [
        "Aprire una connessione TCP richiede un <em>Three-Way Handshake</em> (1 RTT di ritardo prima ancora di chiedere il file) e fa ripartire la finestra di congestione da <code>1 MSS</code> (Slow Start). Riutilizzando la stessa connessione TCP per scaricare tutti gli oggetti di una pagina Web (<strong>connessione persistente</strong>), si paga il costo di apertura <strong>una sola volta</strong> anziché per ogni singolo oggetto."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 99,
      "title": "Prestazioni del CSMA puro 1-persistente rispetto ad ALOHA",
      "topic": "collegamento",
      "question": "Come si comporta il protocollo CSMA puro (ovvero senza la capacità di rilevare perdite o collisioni) nella sua versione 1-persistente rispetto ad ALOHA?",
      "options": [
        {
          "origKey": "a",
          "text": "Funziona molto meglio in termini di throughput, poiché ogni volta che trova il canale occupato ritenta dopo un tempo casuale. Di fatto dunque trasmette solamente se il canale è effettivamente libero."
        },
        {
          "origKey": "b",
          "text": "Può causare grandi ritardi di trasmissione poiché attende che il canale si liberi prima di trasmettere, mentre in ALOHA questo non accade."
        },
        {
          "origKey": "c",
          "text": "Leggermente meglio in termini di throughput di rete, poiché nonostante la sua aggressività (trasmissione deterministica del frame non appena il canale si libera) evita perlomeno di trasmettere mentre qualcun altro sta già utilizzando il canale."
        },
        {
          "origKey": "d",
          "text": "In termini di throughput funziona meglio della versione pura di ALOHA, ma peggio di quella slotted, poiché causa più collisioni."
        }
      ],
      "correctKey": "c",
      "refs": "Protocolli MAC CSMA vs ALOHA",
      "explanation": [
        "Nel <strong>CSMA 1-persistente</strong>, se una stazione trova il canale occupato, aspetta che si liberi e poi trasmette immediatamente (con probabilità 1). Questo comportamento è aggressivo (se due stazioni aspettavano insieme, collidono appena il canale si libera), quindi il throughput crolla ad alti carichi; tuttavia funziona comunque meglio di <strong>Aloha puro</strong> perché, ascoltando prima il canale (<em>Carrier Sense</em>), evita almeno di interrompere una trasmissione già in corso."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 100,
      "title": "Vantaggio del NAPT (Network Address and Port Translation)",
      "topic": "rete",
      "question": "La funzione NAPT (Network Address and Port Translation) è la più usata per interconnettere reti IP private alla internet pubblica, un NAPT consente:",
      "options": [
        {
          "origKey": "a",
          "text": "Di mappare IP privati su IP pubblici consentendo anche di raggiungere in modo trasparente i server con indirizzo IP privato."
        },
        {
          "origKey": "b",
          "text": "Di mappare un singolo IP privato su un singolo IP pubblico legandoli in modo biunivoco per la durata della connessione."
        },
        {
          "origKey": "c",
          "text": "Di mappare IP privati su IP pubblici, ma solo per il protocollo di trasporto TCP che è orientato alla connessione e usa le porte per identificare i flussi dati."
        },
        {
          "origKey": "d",
          "text": "Di mappare un numero pressoché illimitato di IP privati su un singolo IP pubblico grazie alla flessibilità di modificare anche le porte sorgente dei client con IP privati."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 3022",
      "explanation": [
        "Un NAT base tradurrebbe 1 IP privato in 1 IP pubblico (non risolvendo la scarsità di indirizzi). Il <strong>NAPT</strong> sfrutta invece i 16 bit del campo <strong>porta sorgente</strong> (oltre all'IP e alla porta di destinazione): modificando la porta sorgente di ogni flusso in uscita, permette a centinaia o migliaia di host privati di navigare contemporaneamente usando <strong>un unico indirizzo IP pubblico</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 101,
      "title": "Come funziona il comando traceroute",
      "topic": "rete",
      "question": "Il comando \"traceroute\":",
      "options": [
        {
          "origKey": "a",
          "text": "Sfrutta il fatto che i router dovrebbero inviare un messaggio ICMP di notifica alla sorgente del messaggio ICMP traceroute quando lo inoltrano: traceroute è un messaggio specifico di ICMP."
        },
        {
          "origKey": "b",
          "text": "Sfrutta il fatto che i router dovrebbero inviare un messaggio ICMP di errore alla sorgente di un datagramma con TTL = 0 (time to live scaduto, e quindi il datagramma viene scartato)."
        },
        {
          "origKey": "c",
          "text": "Chiede alla destinazione di rimandare alla sorgente un messaggio ICMP che, nel percorso di andata, ha raccolto l'indirizzo IP di tutti i router attraversati."
        },
        {
          "origKey": "d",
          "text": "Interroga le tabelle di routing per trovare il percorso sorgente-destinazione."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 792",
      "explanation": [
        "Per scoprire tutti i router attraversati fino a una destinazione, <code>traceroute</code> invia una sequenza di pacchetti IP incrementando progressivamente il campo <strong>TTL</strong>:<br>• Il primo pacchetto parte con <code>TTL = 1</code>: il primo router lo decrementa a 0, lo scarta e risponde con un messaggio ICMP <strong>Time Exceeded</strong> (<code>Type = 11</code>), rivelando così il proprio indirizzo IP.<br>• Il secondo parte con <code>TTL = 2</code> e scopre il secondo router, e così via finché non si raggiunge l'host finale."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 102,
      "title": "Caratteristica della topologia ad anello bidirezionale",
      "topic": "fondamenti",
      "question": "La topologia ad anello con canali bidirezionali:",
      "options": [
        {
          "origKey": "a",
          "text": "È la topologia in assoluto più economica perché ha il numero minimo di canali possibili."
        },
        {
          "origKey": "b",
          "text": "È la più semplice topologia che ammette una ridondanza di cammini tra tutti i nodi e quindi consente il funzionamento della rete anche in presenza di un singolo canale non funzionante."
        },
        {
          "origKey": "c",
          "text": "È la topologia più usata nelle reti locali per semplicità di cablaggio."
        },
        {
          "origKey": "d",
          "text": "È la topologia più complessa che si può usare senza la necessità di calcolare i cammini migliori tra i nodi."
        }
      ],
      "correctKey": "b",
      "refs": "Topologie di rete",
      "explanation": [
        "L'anello bidirezionale utilizza <code>C = N</code> canali (solo 1 canale in più rispetto all'albero, che non ha alcuna ridondanza). Grazie al doppio senso di percorrenza, esistono <strong>due percorsi alternativi</strong> tra ogni coppia di nodi: se un cavo si trancia, la rete continua a funzionare instradando il traffico lungo l'altro arco dell'anello (a capacità dimezzata)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 103,
      "title": "Caratteristiche del protocollo HTTP/2",
      "topic": "trasporto_app",
      "question": "Il protocollo HTTP/2, attualmente in fase di adozione da parte di quasi tutti gli host in internet, ha le seguenti caratteristiche:",
      "options": [
        {
          "origKey": "a",
          "text": "È basato sull'apertura di una singola connessione TCP crittografata (https, ovvero http su TLS) tra client e server e definisce i concetti di 'stream' e 'frame' che consentono di multiplare la trasmissione di diversi oggetti sulla stessa connessione, evitando il fenomeno di 'blocco' che potrebbe accadere su una singola connessione se il primo oggetto richiesto impiega molto a essere trasferito. È una evoluzione del protocollo SPDY proprietario di Google ed è stato standardizzato nel 2015."
        },
        {
          "origKey": "b",
          "text": "È basato sull'apertura di una singola connessione TCP crittografata (https, ovvero http su TLS) tra client e server e definisce i concetti di 'stream' e 'frame' per lasciare maggiore libertà ai client (browser) sull'ordine e la priorità con cui scaricare gli oggetti della pagina Web in modo da poter ottimizzare il suo 'rendering' sul terminale dell'utente."
        },
        {
          "origKey": "c",
          "text": "È una semplice evoluzione di http/1.1 che consente di crittografare le connessioni rendendole sicure (https, ovvero http su TLS), inoltre permette ai client di scegliere con maggiore libertà l'ordine con cui scaricare gli oggetti che compongono la pagina Web."
        },
        {
          "origKey": "d",
          "text": "È basato sull'apertura di una singola connessione crittografata che non usa TCP, ma UDP (http su DTLS) per evitare che le fluttuazioni della finestra TCP dovuta alle perdite rendano difficile la trasmissione di contenuti multimediali."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 7540 / RFC 9113",
      "explanation": [
        "In HTTP/1.1, anche con il pipelining su connessione persistente, se il primo oggetto richiesto era lento a generarsi bloccava tutti i successivi (<em>Head-of-Line blocking</em> applicativo). <strong>HTTP/2</strong> (derivato da SPDY di Google e standardizzato IETF nel 2015) risolve il problema aprendo <strong>una sola connessione TCP cifrata (TLS)</strong> e suddividendo i flussi in <strong>stream</strong> spezzettati in <strong>frame</strong> binari, che vengono <strong>multiplati in parallelo</strong> sulla stessa connessione."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 104,
      "title": "Perché Internet permette lo sviluppo illimitato di nuove applicazioni",
      "topic": "fondamenti",
      "question": "Quale delle seguenti affermazioni è corretta?",
      "options": [
        {
          "origKey": "a",
          "text": "Per sviluppare una applicazione su internet è necessario far registrare un nome a dominio da un registrar e, in ultima analisi da IANA, in modo che l'applicazione sia nota e possa essere trovata dai processi client."
        },
        {
          "origKey": "b",
          "text": "Le applicazioni di internet sono illimitate perché possono essere sviluppate negli host terminali senza dover modificare le funzioni all'interno della rete."
        },
        {
          "origKey": "c",
          "text": "Le applicazioni di internet sono moltissime, ma sono limitate dai servizi offerti dai protocolli di livello trasporto: se non esiste un protocollo di livello trasporto opportuno allora non si può sviluppare una nuova applicazione."
        },
        {
          "origKey": "d",
          "text": "Ad ogni applicazione corrisponde uno e un solo protocollo di livello applicativo, ad esempio FTP per file transfer, HTTP per il Web, SMTP per la posta elettronica e così via."
        }
      ],
      "correctKey": "b",
      "refs": "Principio end-to-end / Modello a clessidra",
      "explanation": [
        "Uno dei pilastri architetturali di Internet (modello a clessidra) è che <strong>i servizi e le applicazioni risiedono esclusivamente ai confini della rete (negli host terminali)</strong>, mentre il nucleo della rete (router e IP) fa solo da vettore <em>best effort</em> di pacchetti. Chiunque può inventare e distribuire una nuova applicazione (Web, streaming, gaming, VoIP) scrivendo software sugli host senza dover chiedere permessi o modificare i router della rete."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 105,
      "title": "Il campo Checksum nell'header UDP",
      "topic": "trasporto_app",
      "question": "L'header di un segmento UDP (User Datagram Protocol) contiene un campo checksum opzionale lungo 16 bit, esso:",
      "options": [
        {
          "origKey": "a",
          "text": "Permette la correzione degli errori nell'header UDP, e rileva errori nei dati del payload e anche alcune informazioni dell'header IP (pseudo-header IP)."
        },
        {
          "origKey": "b",
          "text": "Permette la correzione degli errori, coprendo l'header UDP e anche alcune informazioni dell'header IP (pseudo-header IP)."
        },
        {
          "origKey": "c",
          "text": "Permette la rilevazione degli errori, coprendo l'header UDP e alcune informazioni dell'header IP (pseudo-header IP), opzionalmente può coprire anche i dati nel payload."
        },
        {
          "origKey": "d",
          "text": "Permette la correzione di fino a 16 bit errati, coprendo l'header UDP, i dati del payload e anche alcune informazioni dell'header IP (pseudo-header IP)."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 768",
      "explanation": [
        "Il checksum UDP (16 bit) serve esclusivamente a <strong>rilevare</strong> (non a correggere) eventuali bit alterati. Per verificare che il segmento non sia stato consegnato per errore a un host o a un protocollo sbagliato, il calcolo include, oltre all'header UDP (e opzionalmente al payload), anche uno <strong>pseudo-header IP</strong> contenente IP sorgente, IP destinazione e numero di protocollo (creando una nota violazione della separazione tra livelli)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 106,
      "title": "Come si ottiene il framing in Ethernet",
      "topic": "collegamento",
      "question": "Il framing (delimitazione delle trame) in Ethernet si ottiene:",
      "options": [
        {
          "origKey": "a",
          "text": "Da un inter packet gap (IPG, un periodo di silenzio) sia prima che dopo la trama."
        },
        {
          "origKey": "b",
          "text": "Con il byte start of frame <code>10101011</code> al termine del preambolo di sincronizzazione (costituito da una sequenza <code>101010...</code>) e anche come byte finale della trama."
        },
        {
          "origKey": "c",
          "text": "Con il byte start of frame <code>10101011</code> al termine del preambolo di sincronizzazione (costituito da una sequenza <code>101010...</code>) e inoltre specificando la lunghezza della trama stessa in un campo apposito dell'header."
        },
        {
          "origKey": "d",
          "text": "Dall'indirizzo MAC della destinazione all'inizio della trama e dal campo checksum che contiene il CRC alla fine della trama."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.3",
      "explanation": [
        "Ethernet (IEEE 802.3) combina due tecniche di framing:<br>1. L'<strong>inizio della trama</strong> è individuato dal Preambolo (<code>10101010...</code>) seguito dal byte <strong>Start of Frame Delimiter</strong> (<code>10101011</code>).<br>2. La <strong>fine della trama</strong> è determinata leggendo il campo <strong>Length</strong> presente nell'header Ethernet (tecnica del <em>character count</em>), che indica esattamente quanti byte di payload seguono prima del CRC finale."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 107,
      "title": "Modellazione a grafo di una porzione di Internet",
      "topic": "fondamenti",
      "question": "Un grafo G=(V,A) può rappresentare efficacemente la topologia di una porzione di internet quando:",
      "options": [
        {
          "origKey": "a",
          "text": "V è l'insieme dei dispositivi della rete (router più host) e A è l'insieme delle connessioni TCP attualmente aperte."
        },
        {
          "origKey": "b",
          "text": "V è l'insieme delle subnet della porzione di rete e A è l'insieme delle connessioni logiche tra i router."
        },
        {
          "origKey": "c",
          "text": "V è l'insieme dei router della rete e A è l'insieme di tutti gli host che stanno nelle subnet dei router."
        },
        {
          "origKey": "d",
          "text": "V è l'insieme dei router considerati e A è l'insieme delle subnet che interconnettono i router. Se una subnet interconnette più di un router, allora questa viene rappresentata in A come archi distinti per ogni coppia di router."
        }
      ],
      "correctKey": "d",
      "refs": "Modellazione topologica di rete",
      "explanation": [
        "A livello di rete (Livello 3), la topologia di Internet è costituita dai <strong>router</strong> (i nodi di commutazione <em>V</em>) interconnessi tra loro dalle <strong>sottoreti (subnet)</strong> (gli archi <em>A</em>). Poiché in un grafo standard un arco collega due vertici, se una stessa LAN/subnet collega 3 o più router (es. tramite uno switch), viene modellata come una maglia di archi punto-punto tra ogni coppia di router collegati a quella subnet."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 108,
      "title": "Significato di MTU e frammentazione IP",
      "topic": "rete",
      "question": "Qual è il significato di MTU, con particolare riferimento alla frammentazione dei datagrammi IP:",
      "options": [
        {
          "origKey": "a",
          "text": "La MTU (minimum transmission unit) è la dimensione minima del payload dei datagrammi in un dato segmento di rete, datagrammi più piccoli che lo attraversano vengono allungati a MTU tramite il padding."
        },
        {
          "origKey": "b",
          "text": "La MTU (maximum transmission unit) è la dimensione massima delle trame in un dato segmento di rete: un datagramma più grande che attraversa tale segmento viene compresso (ad esempio con l'algoritmo di Lempel-Ziv) per diventare più corto di MTU."
        },
        {
          "origKey": "c",
          "text": "La MTU (maximum transmission unit) è la dimensione massima del payload di una trama in un dato segmento di rete: un datagramma più grande che attraversa tale segmento deve essere frammentato oppure scartato."
        },
        {
          "origKey": "d",
          "text": "La MTU (minimum transmission unit) è la dimensione minima delle trame perché il livello 2 possa funzionare correttamente."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 791, RFC 8200",
      "explanation": [
        "La <strong>MTU</strong> indica quanti byte al massimo può contenere il campo dati (<em>payload</em>) di una trama L2 su un determinato collegamento. Se un datagramma IP supera la MTU del collegamento successivo, in IPv4 viene spezzato in più datagrammi più piccoli (<strong>frammentazione</strong>, a meno che il flag <code>DF</code> <em>Don't Fragment</em> sia attivo), mentre in IPv6 (e nei router moderni che evitano la frammentazione per prestazioni) viene <strong>scartato</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 109,
      "title": "Quando sono indispensabili i protocolli Aloha e Slotted Aloha",
      "topic": "collegamento",
      "question": "I protocolli aloha e slotted aloha:",
      "options": [
        {
          "origKey": "a",
          "text": "Sono usati in WiFi per prenotare il canale (collision avoidance)."
        },
        {
          "origKey": "b",
          "text": "Hanno una pura rilevanza storica e non sono più usati in alcuna rete."
        },
        {
          "origKey": "c",
          "text": "Sono gli unici protocolli MAC utilizzabili quando non sia possibile ascoltare il canale di trasmissione e non sia possibile avere una entità centralizzata che coordina l'accesso."
        },
        {
          "origKey": "d",
          "text": "Si possono usare solo nelle reti radio, perché in una rete cablata se il canale è occupato la trasmissione è automaticamente inibita."
        }
      ],
      "correctKey": "c",
      "refs": "Protocolli MAC",
      "explanation": [
        "<strong>Aloha</strong> e <strong>Slotted Aloha</strong> trasmettono senza ascoltare preventivamente il canale (<em>no carrier sense</em>) e senza un coordinatore centrale. Sono perciò l'unica soluzione possibile quando:<br>1. Non esiste un controllore centrale (es. fase iniziale di accesso random access alla rete cellulare da parte di uno smartphone); oppure<br>2. Il tempo di propagazione del segnale è maggiore della durata della trama (es. collegamenti satellitari), caso in cui ascoltare il canale prima di trasmettere sarebbe inutile perché l'informazione sullo stato del canale arriverebbe già obsoleta."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 110,
      "title": "Funzionalità del protocollo IMAP",
      "topic": "trasporto_app",
      "question": "Il protocollo IMAP consente ad uno User Agent di posta elettronica:",
      "options": [
        {
          "origKey": "a",
          "text": "Di inviare messaggi di posta elettronica al proprio server, mentre per riceverli bisogna usare POP3."
        },
        {
          "origKey": "b",
          "text": "Di scaricare i messaggi da un server, eventualmente cancellandoli dal server, ma non di gestirli sul server stesso."
        },
        {
          "origKey": "c",
          "text": "Di gestire i messaggi direttamente sul server senza poterli scaricare in locale."
        },
        {
          "origKey": "d",
          "text": "Di scaricare i messaggi da un server e di gestirli in modo coordinato su tutti gli User Agent che si collegano alla casella di posta elettronica (PC, Smartphone, etc.)."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9051",
      "explanation": [
        "A differenza del vecchio POP3 (RFC 1939, che scarica le email su un singolo dispositivo e di norma le cancella dal server), <strong>IMAP</strong> (<em>Internet Mail Access Protocol</em>) mantiene la casella e le cartelle organizzate direttamente sul server di posta, consentendo all'utente di scaricare e sincronizzare lo stato dei messaggi (letti, spostati, eliminati) su <strong>più dispositivi contemporaneamente</strong> (PC, smartphone, tablet)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 111,
      "title": "Funzionamento del GET condizionale in HTTP",
      "topic": "trasporto_app",
      "question": "Nel protocollo HTTP il metodo GET condizionale consente di interrogare un server Web:",
      "options": [
        {
          "origKey": "a",
          "text": "Per sapere se un oggetto è stato modificato dopo una data che viene specificata nella richiesta; se l'oggetto non è stato modificato il server risponde con il codice '304 not modified', altrimenti trasferisce l'oggetto."
        },
        {
          "origKey": "b",
          "text": "Per sapere se un oggetto che non era disponibile è diventato disponibile e può essere scaricato."
        },
        {
          "origKey": "c",
          "text": "Per sapere se un oggetto è stato modificato dopo una data che viene specificata nella richiesta; se l'oggetto non è stato modificato il server risponde con il codice '304 not modified', altrimenti risponde con il codice '222 object modified' e il client può decidere se scaricarla o meno."
        },
        {
          "origKey": "d",
          "text": "Specificando nella richiesta una condizione per scaricare l'oggetto richiesto, ad esempio se l'oggetto è di dimensione inferiore a una data soglia; se l'oggetto rispetta la condizione il server lo trasferisce, altrimenti risponde con il codice '444 condition not met'."
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 9110, RFC 9111",
      "explanation": [
        "Quando un browser o un server Proxy ha già in cache una pagina o un'immagine, prima di visualizzarla può inviare al server una richiesta HTTP con l'intestazione <code>If-Modified-Since: &lt;data&gt;</code>. Se il file sul server non è cambiato dopo quella data, il server risponde con un messaggio leggerissimo <strong><code>304 Not Modified</code></strong> (senza ritrasmettere il file), risparmiando banda e tempo; altrimenti invia la nuova versione con codice <code>200 OK</code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 112,
      "title": "Uso delle porte da parte del client nell'architettura Client / Server",
      "topic": "trasporto_app",
      "question": "L'architettura di servizio dominante in internet è l'architettura client/server. In questa architettura il processo client, una volta conosciuto l'indirizzo IP dell'host in cui risiede il processo server:",
      "options": [
        {
          "origKey": "a",
          "text": "Inizia la comunicazione usando come porta destinazione una porta effimera assegnata dal sistema operativo in modo casuale per evitare conflitti."
        },
        {
          "origKey": "b",
          "text": "Apre una connessione TCP usando le porte comunicate dal DNS insieme all'indirizzo IP."
        },
        {
          "origKey": "c",
          "text": "Inizia la comunicazione usando come porta destinazione la porta, normalmente \"well known\" del servizio e usando come porta sorgente una porta effimera assegnata dal sistema operativo."
        },
        {
          "origKey": "d",
          "text": "Inizia la comunicazione usando come porta destinazione la porta, normalmente \"well known\", del servizio e usando come porta sorgente la stessa porta per consentire il ritorno dei pacchetti."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 6335",
      "explanation": [
        "Per contattare un server, il client deve conoscerne l'indirizzo IP e la <strong>porta ben nota (well-known, 0–1023)</strong> del servizio richiesto (es. 80 per HTTP, 25 per SMTP), che inserisce come <strong>porta destinazione</strong>. Come <strong>porta sorgente</strong>, invece, il sistema operativo del client assegna dinamicamente un numero casuale maggiore di 1024 detto <strong>porta effimera</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 113,
      "title": "Effetti dello scadere del Retransmission Timeout (RTO) in TCP",
      "topic": "trasporto_app",
      "question": "Lo scadere del retransmission timeout (RTO) in un trasferimento TCP:",
      "options": [
        {
          "origKey": "a",
          "text": "È una condizione che non può verificarsi dopo la ricezione del terzo ACK duplicato perché la ritrasmissione del segmento perso è gestita da Fast Retransmit/Fast Recovery."
        },
        {
          "origKey": "b",
          "text": "Causa il dimezzamento della SSTHR (SSTHR = SSTHR/2) e la ritrasmissione del segmento perso ponendo CWND = 1 MSS."
        },
        {
          "origKey": "c",
          "text": "Causa il raddoppio di RTO e la ritrasmissione del primo segmento della finestra di trasmissione ponendo CWND = 1 MSS."
        },
        {
          "origKey": "d",
          "text": "Causa SSTHR = CWND/2, CWND = SSTHR + 3 e la ritrasmissione del segmento perso."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 6298, RFC 5681",
      "explanation": [
        "Quando scade il timer <strong>RTO</strong> senza che sia arrivato l'ACK, TCP interpreta l'evento come una congestione grave della rete ed esegue la procedura di recupero da timeout:<br>1. <strong>Raddoppia il valore dell'RTO</strong> (<em>Karn's algorithm / exponential backoff</em>, poiché non ha un nuovo campione RTT valido per ricalcolarlo).<br>2. Imposta la soglia <code>SSTHR = CWND / 2</code> e fa crollare la finestra di congestione a <strong><code>CWND = 1 MSS</code></strong>.<br>3. <strong>Ritrasmette il primo segmento</strong> della finestra (quello non ancora riscontrato) e riparte dalla fase di <em>Slow Start</em>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 114,
      "title": "Avanzamento dei puntatori LP e UP nella finestra di trasmissione TCP",
      "topic": "trasporto_app",
      "question": "In un protocollo di trasporto affidabile tipo TCP, che numera i byte trasmessi, la finestra di trasmissione può essere identificata da un puntatore LP che punta al primo byte della finestra ed un puntatore UP che punta all'ultimo byte della finestra. Si supponga che ad un dato istante LP = 1340, e UP = 1739 e il trasmettitore riceve un ACK cumulativo che riscontra i byte da 1340 a 1389. Quanto valgono LP e UP dopo la ricezione dell'ACK?",
      "options": [
        {
          "origKey": "a",
          "text": "LP = 1391, UP = 1800"
        },
        {
          "origKey": "b",
          "text": "LP = 1390, la finestra di trasmissione si allunga di 100 byte, quindi UP = 1889"
        },
        {
          "origKey": "c",
          "text": "LP = 1390, UP dipende da se e come evolve la finestra di trasmissione"
        },
        {
          "origKey": "d",
          "text": "Il trasmettitore attende i riscontri di tutti i byte nella finestra di trasmissione (o va in timeout), poi LP = 1750 e UP = 2149"
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 9293",
      "explanation": [
        "La finestra di trasmissione TCP è delimitata dal puntatore inferiore <strong>LP</strong> (<em>Lower Pointer</em>, <code>SND.UNA</code>, il primo byte inviato ma non ancora riscontrato) e dal puntatore superiore <strong>UP</strong> (<em>Upper Pointer</em>, l'ultimo byte trasmissibile).",
        "Inizialmente <code>LP = 1340</code>. Quando il trasmettitore riceve un ACK cumulativo che riscontra i byte fino a <code>1389</code> (quindi con <code>ACK Number = 1390</code>), la finestra scorre in avanti e il nuovo primo byte non riscontrato diventa esattamente <strong><code>LP = 1390</code></strong>. La nuova posizione di <strong>UP</strong> (<code>UP = LP + TXWND − 1</code>) dipende invece da come evolve la dimensione della finestra di trasmissione (in base a <em>CWND</em> e <em>RWND</em>)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 115,
      "title": "Obiettivo di un protocollo MAC (Medium Access Control)",
      "topic": "collegamento",
      "question": "Il compito di un protocollo MAC (Medium Access Control) è:",
      "options": [
        {
          "origKey": "a",
          "text": "Assegnare le risorse trasmissive di un canale condiviso alle stazioni, in modo che non ci possano essere contese."
        },
        {
          "origKey": "b",
          "text": "Organizzare l'accesso delle stazioni a un canale di trasmissione condiviso avendo come obiettivo primario la riduzione del tempo di attesa delle trame prima della trasmissione, ciò anche a discapito dell'equità nell'accesso pur di evitare che una singola stazione lenta possa penalizzare le altre."
        },
        {
          "origKey": "c",
          "text": "Organizzare l'accesso delle stazioni a un canale di trasmissione condiviso dividendo le risorse del canale in modo rigorosamente uguale tra tutte le stazioni."
        },
        {
          "origKey": "d",
          "text": "Organizzare l'accesso delle stazioni a un canale di trasmissione condiviso cercando di massimizzare l'uso del canale stesso mantenendo contemporaneamente un livello di equità accettabile."
        }
      ],
      "correctKey": "d",
      "refs": "IEEE 802",
      "explanation": [
        "Quando più stazioni condividono lo stesso mezzo trasmissivo (come l'etere nel Wi-Fi), il sottolivello <strong>MAC</strong> coordina chi può trasmettere e quando, bilanciando due obiettivi fondamentali: <strong>sfruttare al massimo la capacità del canale</strong> (evitando collisioni e tempi morti) e <strong>garantire equità (fairness)</strong> affinché nessuna stazione resti bloccata indefinitamente senza poter trasmettere."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 116,
      "title": "Suddivisione dei 128 bit di un indirizzo IPv6",
      "topic": "rete",
      "question": "I 128 bit degli indirizzi IPv6 sono:",
      "options": [
        {
          "origKey": "a",
          "text": "Divisi in un numero di bit b per l'instradamento globale variabile tra 48 e 64 bit per l'identificazione delle singole interfacce locali ed eventuale subnetting usando i 64 − b bit avanzati."
        },
        {
          "origKey": "b",
          "text": "Rigidamente divisi in 32 bit per l'instradamento globale, 32 bit per la suddivisione in subnet locali e 64 bit per l'identificazione delle singole interfacce locali."
        },
        {
          "origKey": "c",
          "text": "Rigidamente divisi in 63 bit per l'instradamento globale e 63 bit per l'identificazione delle singole interfacce locali, con eventuale subnetting effettuando da maschere di sottorete da 64 bit."
        },
        {
          "origKey": "d",
          "text": "Rigidamente divisi in 48 bit per l'instradamento globale, 16 bit per la suddivisione in subnet locali e 64 bit per l'identificazione delle singole interfacce locali."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 3587, RFC 4291",
      "explanation": [
        "Un indirizzo unicast globale <strong>IPv6</strong> (128 bit totali) ha una struttura gerarchica fissa:<br>• <strong>48 bit</strong> per il prefisso di <strong>instradamento globale</strong> (esaminati dai router di dorsale Tier 1).<br>• <strong>16 bit</strong> per il <strong>Subnet ID</strong> (usati internamente dall'organizzazione/ISP per creare fino a <code>2<sup>16</sup> = 65536</code> sottoreti locali).<br>• <strong>64 bit</strong> per l'<strong>Interface ID</strong> (identifica la singola scheda di rete nella sottorete)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 117,
      "title": "Affermazione FALSA sulla capacità di Shannon",
      "topic": "fondamenti",
      "question": "Claude Shannon, padre della teoria dell'informazione, ha proposto un modello di canale di trasmissione noto come additive white gaussian noise (AWGN). Siano B la banda del canale in Hz, S l'energia associata ai bit trasmessi e N l'energia del rumore additivo per ciascun bit. In base alla teoria di Shannon, la capacità massima C in bit/s di questo canale trasmissivo è C = B log<sub>2</sub>(S/N + 1). Quale di queste affermazioni è FALSA?",
      "options": [
        {
          "origKey": "a",
          "text": "Raddoppiando la banda del canale la capacità raddoppia."
        },
        {
          "origKey": "b",
          "text": "Raddoppiando l'energia del segnale la capacità aumenta di quattro volte."
        },
        {
          "origKey": "c",
          "text": "Se l'energia per bit del rumore N è maggiore dell'energia per bit del segnale la capacità diventa minore di B bit/s."
        },
        {
          "origKey": "d",
          "text": "Aumentando l'energia del segnale la capacità aumenta."
        }
      ],
      "correctKey": "b",
      "refs": "Teorema di Shannon-Hartley",
      "explanation": [
        "Nella formula <code>C = B log<sub>2</sub>(S/N + 1)</code>, la banda <em>B</em> è un fattore moltiplicativo lineare (quindi se raddoppi <em>B</em>, raddoppia <em>C</em>: la ({{opt:a}}) è vera). L'energia del segnale <em>S</em> si trova invece <strong>all'interno del logaritmo</strong> in base 2: raddoppiando <em>S</em>, la capacità <em>C</em> aumenta di molto meno del doppio (e mai di quattro volte!). Pertanto la ({{opt:b}}) è <strong>falsa</strong>. <em>(Anche la ({{opt:c}}) è vera: se N &gt; S, allora S/N &lt; 1 ⇒ S/N + 1 &lt; 2 ⇒ log<sub>2</sub>(S/N + 1) &lt; 1 ⇒ C &lt; B).</em>"
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 118,
      "title": "Struttura dell'intestazione delle risposte HTTP",
      "topic": "trasporto_app",
      "question": "La struttura dell'intestazione (header) delle richieste HTTP è (&lt;SP&gt; rappresenta uno spazio):",
      "options": [
        {
          "origKey": "a",
          "text": "Contrariamente alle richieste che sono in formato testuale, è formata da campi binari di dimensione fissa per velocizzare l'elaborazione nel browser."
        },
        {
          "origKey": "b",
          "text": "La prima riga ha la seguente forma fissa: <code>&lt;metodo&gt;&lt;SP&gt;&lt;versione&gt;&lt;SP&gt;&lt;risposta&gt;CRLF</code> ; le righe successive hanno la forma generica: <code>&lt;tag&gt;:&lt;SP&gt;&lt;valore&gt;CRLF</code>"
        },
        {
          "origKey": "c",
          "text": "La prima riga ha la seguente forma fissa: <code>&lt;versione&gt;&lt;SP&gt;&lt;codice di stato&gt;&lt;SP&gt;&lt;espressione di stato&gt;CRLF</code> ; le righe successive hanno la forma generica: <code>&lt;tag&gt;:&lt;SP&gt;&lt;valore&gt;CRLF</code>"
        },
        {
          "origKey": "d",
          "text": "È formata da campi testuali descrittivi con un formato compatibile con XML così è facile da parsificare."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 9112",
      "sourceNote": "Nel testo originale della domanda c'è un refuso di stampa e si legge 'richieste HTTP' anziché 'risposte HTTP' (mentre la domanda 38 riguarda le richieste).",
      "explanation": [
        "La prima riga di un messaggio di <strong>risposta HTTP</strong> (detta <em>status-line</em>) ha esattamente la struttura: versione del protocollo, codice numerico di stato ed espressione testuale (es. <code>HTTP/1.1 200 OK\\r\\n</code>), seguita dalle righe di intestazione <code>Tag: Valore\\r\\n</code>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 119,
      "title": "Sindrome del terminale nascosto nel Wi-Fi",
      "topic": "collegamento",
      "question": "La cosiddetta \"sindrome del terminale nascosto\" è dovuta a:",
      "options": [
        {
          "origKey": "a",
          "text": "Una condizione patologica che impedisce a un ricevitore di \"trovare\" il terminale che sta trasmettendo."
        },
        {
          "origKey": "b",
          "text": "Due terminali che non si sentono l'un l'altro e trasmettono verso la stessa destinazione causando collisioni sistematiche."
        },
        {
          "origKey": "c",
          "text": "Due terminali che non si sentono l'un l'altro e quindi non possono trasmettere reciprocamente."
        },
        {
          "origKey": "d",
          "text": "Una condizione patologica che impedisce ai trasmettitori di ricevere correttamente gli ACK dei ricevitori."
        }
      ],
      "correctKey": "b",
      "refs": "IEEE 802.11",
      "explanation": [
        "Supponiamo che le stazioni A e C siano entrambe nel raggio d'azione dell'Access Point B, ma siano troppo lontane (o separate da un ostacolo) per sentirsi tra loro. Se A sta trasmettendo verso B, C ascolta il canale, non sente nulla (perché A è nascosto) e inizia a trasmettere anche lei verso B, provocando una <strong>collisione sistematica</strong> sul ricevitore B. Il problema si risolve con l'handshake <strong>RTS/CTS</strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 120,
      "title": "Lunghezza di una trama Ethernet che trasporta un ACK TCP",
      "topic": "collegamento",
      "question": "Un ACK di TCP, quindi un segmento senza payload, deve essere trasmesso attraverso una porzione di rete Ethernet. Quanto è lunga la trama, ignorando l'Inter Frame Gap e il preambolo?",
      "options": [
        {
          "origKey": "a",
          "text": "66 byte: 8 byte di start of frame, 14 byte di header Ethernet, 20 byte di header IP, 20 byte di header TCP, 4 byte di trailer Ethernet."
        },
        {
          "origKey": "b",
          "text": "60 byte: 14 byte di header Ethernet, 20 byte di header IP, 20 byte di header TCP, 2 byte di Acknowledgement number, 4 byte di trailer Ethernet."
        },
        {
          "origKey": "c",
          "text": "64 byte: 14 byte di header Ethernet, 20 byte di header IP, 20 byte di header TCP, 6 byte di padding, 4 byte di trailer Ethernet."
        },
        {
          "origKey": "d",
          "text": "58 byte: 14 byte di header Ethernet, 20 byte di header IP, 20 byte di header TCP, 4 byte di trailer Ethernet."
        }
      ],
      "correctKey": "c",
      "refs": "IEEE 802.3, IETF RFC 791, RFC 9293",
      "explanation": [
        "Sommiamo le dimensioni standard delle intestazioni (ignorando preambolo di 7 B, SFD di 1 B e IPG di 12 B):<br>• Header Ethernet (MAC dest 6 B + MAC src 6 B + Type/Len 2 B) = <strong>14 byte</strong><br>• Header IPv4 (senza opzioni) = <strong>20 byte</strong><br>• Header TCP (senza opzioni, 0 byte dati perché è un puro ACK) = <strong>20 byte</strong><br>• Trailer Ethernet (FCS / CRC-32) = <strong>4 byte</strong>",
        "La somma parziale è <code>14 + 20 + 20 + 4 = 58 byte</code>. Tuttavia, per garantire il rilevamento collisioni in IEEE 802.3, ogni trama Ethernet deve avere una <strong>lunghezza minima di 64 byte</strong>: il livello Ethernet aggiunge automaticamente <strong>6 byte di padding</strong> per arrivare a 64 byte."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 121,
      "title": "Cosa risolve sempre il protocollo ARP",
      "topic": "collegamento",
      "question": "Il protocollo ARP (Address Resolution Protocol) risolve sempre:",
      "options": [
        {
          "origKey": "a",
          "text": "L'indirizzo IP della URL specificata nella richiesta."
        },
        {
          "origKey": "b",
          "text": "L'indirizzo IP del Default Gateway a cui consegnare il datagramma per l'inoltro."
        },
        {
          "origKey": "c",
          "text": "L'indirizzo MAC corrispondente all'indirizzo IP di destinazione."
        },
        {
          "origKey": "d",
          "text": "L'indirizzo MAC del next-hop, ovvero dell'host o router a cui deve essere consegnato il datagramma IP per il corretto inoltro verso la destinazione."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 826",
      "explanation": [
        "Il protocollo ARP opera esclusivamente all'interno della sottorete locale. Se il destinatario finale si trova nella stessa subnet, ARP risolve il MAC del destinatario stesso; se invece il destinatario si trova su un'altra rete su Internet, l'host deve consegnare il pacchetto al proprio router, quindi ARP risolve l'<strong>indirizzo MAC del router (next-hop)</strong> a cui affidare il datagramma. In entrambi i casi, ARP risolve sempre il MAC del <em>next-hop</em>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 122,
      "title": "Coesistenza di routing, inoltro (forwarding) e NAPT",
      "topic": "rete",
      "question": "Considerando le funzioni logiche di routing, inoltro e NAPT (Network Address and Port Translation):",
      "options": [
        {
          "origKey": "a",
          "text": "Spesso sono implementate su dispositivi diversi dato che le funzioni di NAPT e inoltro sono indipendenti: nel flusso in uscita da una rete privata verso la rete pubblica si può operare l'inoltro senza il NAPT e viceversa."
        },
        {
          "origKey": "b",
          "text": "Se implementate sullo stesso dispositivo, è necessario avere molta memoria disponibile perché entrambe le funzioni logiche devono memorizzare informazioni di stato. Se invece sono su dispositivi diversi la memoria è di meno perché le informazioni di stato non si moltiplicano."
        },
        {
          "origKey": "c",
          "text": "Spesso sono implementate sullo stesso dispositivo anche se coinvolgono livelli diversi (NAPT coinvolge anche il livello trasporto) dato che alla funzione NAPT è sempre associata una corrispondente funzione di inoltro."
        },
        {
          "origKey": "d",
          "text": "Che siano implementate sullo stesso dispositivo o meno, l'importante è che siano funzioni coordinate perché si complementano: l'inoltro lavora a livello di rete e il NAPT al livello di trasporto."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 3022",
      "explanation": [
        "Il <strong>forwarding</strong> (Livello 3) inoltra i pacchetti tra sottoreti diverse, mentre il <strong>NAPT</strong> (che tocca Livello 3 e Livello 4 per tradurre IP e porte) serve proprio a collegare una rete privata a una rete pubblica. Poiché il passaggio tra rete privata e pubblica richiede sempre l'instradamento/inoltro dei pacchetti tra due interfacce di rete diverse, le funzioni di router e NAPT vengono quasi sempre integrate nello stesso apparato (come il router di casa)."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 123,
      "title": "Indirizzi IP usati nei messaggi DHCP Discover e DHCP Offer",
      "topic": "rete",
      "question": "DHCP (Dynamic Host Configuration Protocol) serve a configurare in modo automatico un host quando questo si collega ad una rete locale. Quali indirizzi IP vengono usati da client e server nel primo scambio (discover/offer) supponendo che l'indirizzo del server sia <code>222.1.1.5</code> e quello offerto al client <code>222.1.1.33</code>?",
      "options": [
        {
          "origKey": "a",
          "text": "Discover: SRC <code>0.0.0.0</code>; DEST: <code>255.255.255.255</code> — Offer: SRC: <code>222.1.1.5</code>; DEST: <code>255.255.255.255</code>"
        },
        {
          "origKey": "b",
          "text": "Discover: SRC <code>255.255.255.255</code>; DEST: <code>0.0.0.0</code> — Offer: SRC: <code>222.1.1.5</code>; DEST: <code>255.255.255.255</code>"
        },
        {
          "origKey": "c",
          "text": "Discover: SRC <code>0.0.0.0</code>; DEST: <code>222.1.1.5</code> — Offer: SRC: <code>222.1.1.5</code>; DEST: <code>222.1.1.33</code>"
        },
        {
          "origKey": "d",
          "text": "Discover: SRC <code>0.0.0.0</code>; DEST: <code>255.255.255.255</code> — Offer: SRC: <code>255.255.255.255</code>; DEST: <code>255.255.255.255</code> or <code>222.1.1.33</code>"
        }
      ],
      "correctKey": "a",
      "refs": "IETF RFC 2131",
      "explanation": [
        "• <strong>DHCP Discover (Client → Server):</strong> Il client non ha ancora un IP, quindi mette come sorgente l'indirizzo speciale <em>this computer</em> (<code>0.0.0.0</code>), e non conoscendo l'IP del server usa come destinazione il limited broadcast (<code>255.255.255.255</code>).",
        "• <strong>DHCP Offer (Server → Client):</strong> Il server mette il proprio IP (<code>222.1.1.5</code>) come sorgente (così il client impara chi è il server), mentre come destinazione usa il broadcast (<code>255.255.255.255</code>) perché il client non ha ancora configurato ufficialmente il nuovo IP proposto."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 124,
      "title": "Affermazione FALSA sull'header IPv4",
      "topic": "rete",
      "question": "Quale delle seguenti affermazioni sull'header IP è FALSA?",
      "options": [
        {
          "origKey": "a",
          "text": "Il campo TTL viene decrementato ad ogni hop, il suo scopo è permettere di scartare datagrammi che sono presenti in rete \"da troppo tempo\"."
        },
        {
          "origKey": "b",
          "text": "Il campo checksum consente la rilevazione di errori nell'header IP (ma non nel payload)."
        },
        {
          "origKey": "c",
          "text": "I campi IP sorgente e IP destinazione non vengono mai modificati dai nodi intermedi (a meno che non si attraversi un NAT)."
        },
        {
          "origKey": "d",
          "text": "La lunghezza complessiva dell'header IP, compresa di eventuali opzioni, deve essere un multiplo di 20 byte (che è la lunghezza dell'header senza opzioni). Per questo scopo viene usato il campo padding che aggiunge bit tutti a zero."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 791",
      "explanation": [
        "La ({{opt:d}}) è <strong>falsa</strong>: come visto nella Domanda 56, la lunghezza dell'header IPv4 (compreso il padding) deve essere un multiplo di <strong>32 bit (cioè 4 byte)</strong>, non di 20 byte (20 byte è solo la lunghezza minima dell'header senza opzioni). Le affermazioni ({{opt:a}}), ({{opt:b}}) e ({{opt:c}}) sono invece tutte vere."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 125,
      "title": "Comportamento di un host nella consegna indiretta",
      "topic": "rete",
      "question": "Un host con indirizzo <code>130.192.1.15/24</code> deve consegnare un datagramma a un host con indirizzo <code>130.192.2.27/24</code>. Come si comporta?",
      "options": [
        {
          "origKey": "a",
          "text": "Effettua una consegna diretta perché sono nella stessa subnet."
        },
        {
          "origKey": "b",
          "text": "Invia il datagramma al router di default della sottorete di destinazione e quindi all'indirizzo <code>130.192.2.0</code>, che è l'indirizzo di rete corrispondente all'indirizzo unicast <code>130.192.2.27/24</code>."
        },
        {
          "origKey": "c",
          "text": "Risolve l'indirizzo del default gateway con ARP (se non lo ha già nella cache ARP) e lo consegna al default gateway."
        },
        {
          "origKey": "d",
          "text": "Risolve il nome dell'host di destinazione con il servizio DNS e poi invia il datagramma al router di destinazione corretto."
        }
      ],
      "correctKey": "c",
      "refs": "IETF RFC 791, RFC 826",
      "explanation": [
        "L'host sorgente è <code>130.192.1.15/24</code> (NetID: <code>130.192.1</code>), mentre il destinatario è <code>130.192.2.27/24</code> (NetID: <code>130.192.2</code>). I due NetID sono diversi, quindi <strong>non sono nella stessa subnet</strong>. L'host deve effettuare una <strong>consegna indiretta</strong>: cerca nella propria cache ARP l'indirizzo MAC del <strong>default gateway</strong> (il router della sua sottorete), se non lo ha lo risolve tramite ARP e gli invia la trama."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 126,
      "title": "Formula dell'RTO (Retransmission Timeout) in TCP",
      "topic": "trasporto_app",
      "question": "Con quale formula viene calcolato l'RTO (retransmission timeout) di TCP?",
      "options": [
        {
          "origKey": "a",
          "text": "RTO = 4 × SRTT + RTTVAR, dove SRTT è la stima del valor medio di RTT e RTTVAR è la stima della sua varianza."
        },
        {
          "origKey": "b",
          "text": "RTO = SRTT + max(G, 4 × RTTVAR), dove SRTT è la stima del valor medio di RTT, RTTVAR è la stima della sua varianza e G è un valore che dipende dal sistema operativo."
        },
        {
          "origKey": "c",
          "text": "RTO = 2 × SRTT + RTTVAR, dove SRTT è la stima del valor medio di RTT e RTTVAR è la stima della sua varianza."
        },
        {
          "origKey": "d",
          "text": "RTO = SRTT + RTTVAR + G, dove SRTT è la stima del valor medio di RTT, RTTVAR è la stima della sua varianza e G è un valore che dipende dal sistema operativo."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 6298, Sez. 2.2–2.3",
      "explanation": [
        "Partendo dalla media mobile <em>SRTT</em> e dalla varianza <em>RTTVAR</em> (Domanda 7), TCP calcola il timer di ritrasmissione sommando alla media un margine di sicurezza pari a 4 volte la varianza (oppure la granularità <em>G</em> del clock del sistema operativo, se maggiore):<br><code>RTO = SRTT + max(G, 4 × RTTVAR)</code>"
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 127,
      "title": "Scopo della finestra di ricezione di TCP",
      "topic": "trasporto_app",
      "question": "La finestra di ricezione di TCP:",
      "options": [
        {
          "origKey": "a",
          "text": "Implementa il controllo di flusso impedendo al default gateway di inviare più informazioni di quanta il ricevitore ne possa ricevere."
        },
        {
          "origKey": "b",
          "text": "Implementa il controllo di flusso impedendo al sistema operativo di passare al ricevitore più informazioni di quanta questo ne possa memorizzare."
        },
        {
          "origKey": "c",
          "text": "È la massima dimensione dei segmenti (MSS) inviati dal trasmettitore: segmenti più grossi non potrebbero stare nel buffer di ricezione."
        },
        {
          "origKey": "d",
          "text": "Implementa il controllo di flusso impedendo al trasmettitore di inviare più informazioni di quanta il ricevitore ne possa ricevere."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9293",
      "explanation": [
        "La finestra di ricezione (<em>RWND</em>) è il cuore del <strong>controllo di flusso</strong> end-to-end di TCP: comunica al <strong>trasmettitore</strong> la capacità residua del buffer del destinatario, impedendogli di inviare più byte di quanti il ricevitore sia in grado di immagazzinare."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 128,
      "title": "Significato della finestra di ricezione nei protocolli a finestra",
      "topic": "trasporto_app",
      "question": "Cosa rappresenta la finestra di ricezione in un protocollo a finestra del livello trasporto:",
      "options": [
        {
          "origKey": "a",
          "text": "La quantità di dati che il ricevitore può accettare in sequenza dal trasmettitore, eventuali dati fuori sequenza vengono scartati."
        },
        {
          "origKey": "b",
          "text": "È il parametro fondamentale per realizzare il controllo di flusso, perché rappresenta la massima quantità di dati che il ricevitore può memorizzare e quindi la massima quantità di dati che il trasmettitore può inviare senza ricevere riscontri per non rischiare che il buffer del ricevitore vada in overflow."
        },
        {
          "origKey": "c",
          "text": "La quantità di dati che il ricevitore memorizza prima di iniziare a trasferirli al livello applicativo, quindi è fondamentale per non rischiare che vada in overflow il buffer dell'applicazione."
        },
        {
          "origKey": "d",
          "text": "È il parametro fondamentale per realizzare il controllo di congestione, infatti è uguale alla quantità di dati che il trasmettitore potrebbe ritrasmettere a causa delle perdite in rete (Go Back N - N è la dimensione della finestra di ricezione)."
        }
      ],
      "correctKey": "b",
      "refs": "Controllo di flusso",
      "explanation": [
        "È la definizione completa del concetto della Domanda 5: la finestra di ricezione fissa il tetto massimo di dati non ancora riscontrati che possono essere spediti dal trasmettitore senza far traboccare (<em>overflow</em>) la memoria del buffer di ricezione del destinatario."
      ],
      "wrongReasons": "Il ricevitore <em>accetta</em> e memorizza anche dati fuori sequenza purché rientrino nella finestra ({{opt:a}}); non riguarda il buffer dell'applicazione ({{opt:c}}) né il controllo di congestione ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 129,
      "title": "Probabilità che la stazione A trasmetta con successo in 802.11 (CW_min = 32)",
      "topic": "collegamento",
      "question": "Due stazioni A e B di un BSS 802.11 rilevano il canale occupato e attendono quindi la fine del dialogo sul canale per iniziare una procedura di accesso. Nell'ipotesi che siano le uniche due stazioni coinvolte nella procedura e che CW<sub>min</sub> = 32 per entrambe, qual è la probabilità che A trasmetta la propria trama con successo?",
      "options": [
        {
          "origKey": "a",
          "text": "2/32"
        },
        {
          "origKey": "b",
          "text": "1/2"
        },
        {
          "origKey": "c",
          "text": "1/32"
        },
        {
          "origKey": "d",
          "text": "(1/2 − 1/32)"
        }
      ],
      "correctKey": "d",
      "refs": "IEEE 802.11 DCF",
      "sourceNote": "Nel testo del corso la probabilità di successo di A è espressa nella forma approssimata (1/2 − 1/32); il valore combinatorio esatto è ½·(1 − 1/32) = 31/64 ≈ 0.484.",
      "explanation": [
        "Riprendiamo lo scenario della Domanda 10: due sole stazioni A e B estraggono ciascuna un numero casuale uniforme tra 0 e 31 (32 valori possibili). I possibili esiti sono tre:<br>1. <strong>Collisione</strong> (A e B estraggono lo stesso numero): <code>P(coll) = 1/32</code>.<br>2. <strong>Vittoria di A</strong> (A estrae un numero strettamente minore di B).<br>3. <strong>Vittoria di B</strong> (B estrae un numero strettamente minore di A).",
        "La probabilità totale che <em>non</em> ci sia collisione è <code>1 − 1/32</code>. Per simmetria tra le due stazioni, la probabilità esatta che A vinca è <code>½ · (1 − 1/32) = 31/64 ≈ 0.484</code>, che nei materiali del corso è espressa nella forma approssimata <strong><code>(1/2 − 1/32)</code></strong>."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 130,
      "title": "Quando NON viene generato un messaggio ICMP",
      "topic": "rete",
      "question": "Un messaggio ICMP (Internet Control Message Protocol):",
      "options": [
        {
          "origKey": "a",
          "text": "È il payload di un segmento UDP che contiene una segnalazione di errore relativa ad un pacchetto IP, oppure la risposta a un messaggio ICMP, oppure ancora una condizione di errore globale, ad esempio \"network unreachable\"."
        },
        {
          "origKey": "b",
          "text": "Non viene generato se un pacchetto IP ha la checksum errata, l'unica azione del router è semplicemente di scartare il pacchetto."
        },
        {
          "origKey": "c",
          "text": "Viene generato dal protocollo IP in risposta a una condizione di errore, come risposta a un altro messaggio ICMP (tranne i messaggi di errore), o infine come messaggio di segnalazione, ad esempio per verificare la funzionalità di una interfaccia."
        },
        {
          "origKey": "d",
          "text": "Può a sua volta generare un altro pacchetto ICMP in caso di errore."
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 792, RFC 1122 Sez. 3.2.2",
      "explanation": [
        "Per evitare di inondare la rete di segnalazioni inutili o di innescare tempeste di errori, lo standard IETF ICMP (RFC 792 / RFC 1122 Sez. 3.2.2) vieta esplicitamente di generare un messaggio di errore ICMP in risposta a un altro messaggio di errore ICMP, a pacchetti broadcast/multicast, oppure quando un pacchetto IP arriva con l'<strong>header corrotto (checksum errata)</strong> — anche perché l'indirizzo IP sorgente stesso potrebbe essere stato alterato dall'errore! In tal caso il router si limita a scartare silenziosamente il datagramma."
      ],
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 131,
      "title": "Richieste e risposte nel protocollo HTTP/2",
      "topic": "trasporto_app",
      "question": "Le richieste (GET, PUT, ...) e le risposte di HTTP/2",
      "options": [
        {
          "origKey": "a",
          "text": "Restano le stesse di HTTP1.1 e mantengono anche la stessa sintassi, tranne per il fatto che sono criptografate."
        },
        {
          "origKey": "b",
          "text": "Sono inseriti in frame di tipo DATA come pseudo-header, il frame inizia con la keyword HEADERS e richieste e risposte sono identificati da una stringa tipo:<br><code>:&lt;message header field&gt; = &lt;value&gt;</code><br>ad esempio<br><code>:method = GET</code>"
        },
        {
          "origKey": "c",
          "text": "Sono inseriti in frame di tipo DATA come pseudo-header, il frame di richiesta inizia con il metodo della richiesta, ad esempio<br><code>GET someresource HTTP/2</code><br>e il frame di risposta con la riga di stato, ad esempio<br><code>200 OK</code><br>seguito dalla risposta al metodo se presente."
        },
        {
          "origKey": "d",
          "text": "Sono inseriti in frame di tipo HEADER e quindi si riferiscono a uno specifico stream, ma a parte questo sono le stesse di HTTP1.1"
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 7540 / RFC 9113",
      "sourceNote": "Nello standard IETF RFC 7540/9113 gli pseudo-header viaggiano tecnicamente in frame di tipo HEADERS (compressi in binario con HPACK), mentre nella formulazione del corso sono descritti come pseudo-header introdotti dalla keyword HEADERS con sintassi :&lt;campo&gt; = &lt;valore&gt;.",
      "explanation": [
        "In <strong>HTTP/2</strong> i messaggi non usano più la riga testuale iniziale di HTTP/1.1 (<code>GET /risorsa HTTP/1.1</code> o <code>HTTP/1.1 200 OK</code>), ma vengono scomposti in <strong>frame</strong> binari multiplati su <strong>stream</strong> paralleli.",
        "Le informazioni della riga di richiesta e della riga di stato vengono rappresentate tramite speciali campi chiamati <strong>pseudo-header</strong>, il cui nome inizia sempre con i due punti (<code>:</code>), nella forma <code>:&lt;message header field&gt; = &lt;value&gt;</code>: ad esempio <code>:method = GET</code>, <code>:path = /...</code>, <code>:scheme = https</code> per le richieste e <code>:status = 200</code> per le risposte."
      ],
      "wrongReasons": "HTTP/2 non mantiene la sintassi testuale di HTTP/1.1 ({{opt:a}}, {{opt:d}}), e non usa più la vecchia <em>request-line</em> o <em>status-line</em> testuale come <code>GET someresource HTTP/2</code> o <code>200 OK</code> ({{opt:c}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 132,
      "title": "Caratteristiche funzionali principali di HTTP/1.1",
      "topic": "trasporto_app",
      "question": "Quali sono le caratteristiche funzionali principali del protocollo HTTP1.1?",
      "options": [
        {
          "origKey": "a",
          "text": "Il client (browser) apre una connessione TCP dalla propria porta 80 verso la porta 80 o 443 del server, avviene uno scambio di messaggi HTTP, la connessione viene chiusa con una gentle closure se possibile."
        },
        {
          "origKey": "b",
          "text": "Il client (browser) apre una connessione TCP verso la porta 80 o 443 del server, avviene uno scambio di messaggi HTTP, e poi la connessione viene chiusa quando la ricezione degli oggetti viene confermata dal client. HTTP è un protocollo che mantiene informazioni di stato per riscontrare gli oggetti ricevuti."
        },
        {
          "origKey": "c",
          "text": "Il client (browser) apre una connessione TCP dalla propria porta 80 o 443 verso una porta effimera del server, avviene uno scambio di messaggi HTTP, e poi la connessione viene chiusa dal server."
        },
        {
          "origKey": "d",
          "text": "Il client (browser) apre una o più connessioni TCP con la porta 80 o 443 del server, avviene uno scambio di messaggi HTTP. Le connessioni vengono chiuse dal client o dal server in funzione della dinamica dell'applicazione, in genere con un \"reset\"."
        }
      ],
      "correctKey": "d",
      "refs": "IETF RFC 9110, RFC 9112",
      "explanation": [
        "Il client (browser) utilizza una <strong>porta effimera</strong> (<code>&gt; 1024</code>) per contattare la porta <em>well-known</em> del server Web: <strong>80</strong> per HTTP oppure <strong>443</strong> per HTTPS (HTTP su TLS).",
        "Possono essere aperte una o più connessioni TCP (persistenti o parallele) su cui viaggiano i messaggi HTTP (protocollo <strong>stateless</strong>). La connessione viene poi chiusa dal client o dal server in funzione della dinamica dell'applicazione, tipicamente con un \"reset\"."
      ],
      "wrongReasons": "Il client non usa mai la porta 80 o 443 come porta <em>sorgente</em>, ma una porta effimera ({{opt:a}}, {{opt:c}}); inoltre il server ascolta sulle porte 80/443, non su una porta effimera ({{opt:c}}), e HTTP è un protocollo <em>stateless</em> che non mantiene informazioni di stato ({{opt:b}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 133,
      "title": "Definizione di stream in HTTP/2",
      "topic": "trasporto_app",
      "question": "Uno stream di una sessione HTTP/2 è:",
      "options": [
        {
          "origKey": "a",
          "text": "Un metodo aggiunto ad HTTP/2 per migliorare le prestazioni del trasferimento di audio e video stream."
        },
        {
          "origKey": "b",
          "text": "Un flusso bidirezionale di informazioni composto da tanti frame diversi; dato che i frame sono delimitati in modo chiaro è possibile multiplare tanti stream in una unica connessione TLS alternando frame dei diversi stream."
        },
        {
          "origKey": "c",
          "text": "Un flusso bidirezionale di informazioni composto da tanti frame diversi; uno stream corrisponde a una sessione HTTP/2 e i frame consentono di fare multiplazione durante la trasmissione."
        },
        {
          "origKey": "d",
          "text": "Un flusso monodirezionale di informazioni composto da tanti frame diversi; ciascuno stream corrisponde a una richiesta o una risposta del protocollo HTTP/2"
        }
      ],
      "correctKey": "b",
      "refs": "IETF RFC 7540 / RFC 9113",
      "explanation": [
        "In <strong>HTTP/2</strong> l'intera comunicazione avviene su <strong>un'unica connessione TCP/TLS</strong>. All'interno di questa connessione vengono aperti più <strong>stream</strong>: ciascuno stream è un <strong>flusso bidirezionale</strong> logico di informazioni suddiviso in <strong>frame</strong> binari.",
        "Poiché ogni frame è chiaramente delimitato e identificato dal proprio <em>Stream ID</em>, è possibile <strong>multiplare tanti stream contemporaneamente</strong> dentro la stessa connessione TLS alternando i frame dei diversi stream, evitando così il blocco applicativo (<em>Head-of-Line blocking</em>)."
      ],
      "wrongReasons": "Non è un metodo HTTP dedicato ad audio/video ({{opt:a}}); in una stessa sessione/connessione HTTP/2 coesistono <em>molti</em> stream, non uno solo ({{opt:c}}); inoltre ogni stream è <em>bidirezionale</em> (trasporta sia richiesta che risposta), non monodirezionale ({{opt:d}}).",
      "custom": false,
      "difficulty": "medio"
    },
    {
      "id": 201,
      "custom": true,
      "difficulty": "facile",
      "title": "Distinzione tra Bit e Byte e Notazioni di Velocità",
      "topic": "fondamenti",
      "question": "Nelle reti di telecomunicazioni, quale delle seguenti affermazioni riguardo all'uso delle unità di misura per frequenza di cifra (bit rate) e capacità di memoria è corretta?",
      "options": [
        {
          "origKey": "a",
          "text": "Le velocità di trasmissione sui canali si misurano usando multipli binari (1 kbit/s = 1024 bit/s), mentre le memorie usano multipli decimali."
        },
        {
          "origKey": "b",
          "text": "Le velocità di trasmissione sui canali si misurano in multipli decimali di bit al secondo (1 Mbit/s = 10^6 bit/s), mentre le dimensioni in memoria si esprimono in byte con multipli binari (1 KiB = 1024 byte)."
        },
        {
          "origKey": "c",
          "text": "Bit e Byte sono unità equivalenti poiché nei protocolli di rete moderni ogni bit trasmesso corrisponde a una parola di memoria di 1 byte."
        },
        {
          "origKey": "d",
          "text": "Un canale a 10 Mbit/s è in grado di trasferire esattamente 10 Megabyte di file al secondo verso il disco locale dell'host."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 00 (Convenzioni Notazionali) & Cap. 02",
      "explanation": [
        "Come specificato nelle convenzioni del corso: le velocità di trasmissione e frequenze di cifra ($R$) usano tassativamente i multipli <strong>decimali</strong> dello standard SI: $1\\unit{kbit/s} = 10^3\\unit{bit/s}$, $1\\unit{Mbit/s} = 10^6\\unit{bit/s}$, $1\\unit{Gbit/s} = 10^9\\unit{bit/s}$.",
        "La capacità delle memorie RAM e dei buffer si esprime invece in multipli <strong>binari</strong> di byte: $1\\unit{KiB} = 2^{10}\\unit{byte} = 1024\\unit{byte}$, $1\\unit{MiB} = 2^{20}\\unit{byte}$.",
        "Confondere bit e byte comporta un errore macroscopico pari a un fattore 8 ($1\\unit{byte} = 8\\unit{bit}$)."
      ],
      "wrongReasons": "I canali usano prefissi decimali ({{opt:a}}); 1 byte vale 8 bit ({{opt:c}}); un link a 10 Mbit/s trasferisce al massimo 1.25 MB/s teorici (10 / 8), non 10 MB/s ({{opt:d}})."
    },
    {
      "id": 202,
      "custom": true,
      "difficulty": "facile",
      "title": "L'Architettura a Clessidra (Hourglass Model) di Internet",
      "topic": "fondamenti",
      "question": "Per quale motivo l'architettura della suite di protocolli Internet viene comunemente definita \"a clessidra\" (Hourglass Model)?",
      "options": [
        {
          "origKey": "a",
          "text": "Perché il ritardo di propagazione aumenta ai livelli estremi (fisico e applicativo) e si annulla al centro (IP)."
        },
        {
          "origKey": "b",
          "text": "Perché supporta molteplici applicazioni in alto e svariate tecnologie fisiche in basso, convergendo su un unico protocollo universale e comune al centro (IP)."
        },
        {
          "origKey": "c",
          "text": "Perché impone che il throughput diminuisca progressivamente mentre i pacchetti salgono lungo lo stack protocollare."
        },
        {
          "origKey": "d",
          "text": "Perché la larghezza dei buffer di memoria nei router ha forma rastremata verso i nodi di confine."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 01 Sez. 2 (Architettura a Clessidra)",
      "explanation": [
        "Il modello a clessidra (*hourglass architecture*) rappresenta il principio cardine di Internet: <strong>'Everything over IP, IP over everything'</strong>.",
        "Alla base troviamo una grande varietà di mezzi trasmissivi e tecnologie di livello 1 e 2 (Ethernet, Wi-Fi, fibra ottica, 4G/5G, satellite).",
        "Al vertice troviamo una moltitudine di applicazioni e protocolli applicativi (HTTP, DNS, SMTP, video streaming).",
        "Al centro (il collo stretto della clessidra) esiste un solo protocollo comune: <strong>Internet Protocol (IP)</strong>, che rende possibile l'interconnessione globale trasparente."
      ],
      "wrongReasons": "Non riguarda i ritardi di propagazione ({{opt:a}}), né il throughput dello stack ({{opt:c}}), né la forma dei buffer dei router ({{opt:d}})."
    },
    {
      "id": 203,
      "custom": true,
      "difficulty": "medio",
      "title": "Teorema del Campionamento di Nyquist vs Teorema di Shannon",
      "topic": "fondamenti",
      "question": "Dati un canale con banda B = 3000 Hz e un rapporto segnale-rumore SNR = 1000 (circa 30 dB), quali sono le conclusioni corrette confrontando i teoremi di Nyquist e Shannon?",
      "options": [
        {
          "origKey": "a",
          "text": "Shannon stabilisce il limite invalicabile di circa 30 kbit/s in presenza di rumore, mentre Nyquist indicherebbe che con opportuni livelli di segnale M si potrebbe teoricamente superare tale valore se il canale fosse ideale privo di rumore."
        },
        {
          "origKey": "b",
          "text": "Nyquist impone un limite fisico invalicabile di 6000 bit/s indipendente dal rumore e dal numero di livelli di segnale M."
        },
        {
          "origKey": "c",
          "text": "La formula di Shannon fornisce una stima valida solo per la commutazione di circuito, mentre per i pacchetti vale solo la formula di Nyquist."
        },
        {
          "origKey": "d",
          "text": "Se il rumore tende a infinito (SNR -> 0), la capacità di Shannon tende a infinito grazie alla modulazione multilivello."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 01 & Cap. 02 (Banda, Capacità e Velocità)",
      "explanation": [
        "Il <strong>Teorema di Nyquist</strong> ($C = 2B \\log_2 M$) considera un canale privo di rumore: aumentando i livelli di modulazione $M$ (simboli), la velocità teorica crescerebbe indefinitamente.",
        "Il <strong>Teorema di Shannon</strong> ($C = B \\log_2(1 + \\text{SNR})$) introduce il vincolo termodinamico del rumore gaussiano additivo: con $B = 3000\\unit{Hz}$ e $\\text{SNR} = 1000$, si ha $C = 3000 \\cdot \\log_2(1001) \\approx 3000 \\cdot 9.967 \\approx 29.9\\unit{kbit/s}$ (circa $30\\unit{kbit/s}$).",
        "Nessuna modulazione o algoritmo potrà mai superare questo limite asintotico su quel canale reale rumoroso."
      ],
      "wrongReasons": "Nyquist dipende da $\\log_2 M$ e non è limitato a 6000 bit/s ({{opt:b}}); i teoremi valgono per qualsiasi trasmissione su canale fisico continuo ({{opt:c}}); se SNR -> 0 la capacità tende a 0 ({{opt:d}})."
    },
    {
      "id": 204,
      "custom": true,
      "difficulty": "medio",
      "title": "Scomposizione Analitica del Ritardo di Trasferimento End-to-End",
      "topic": "fondamenti",
      "question": "Il ritardo totale sperimentato da un pacchetto su un collegamento punto-punto è dato da d_tot = d_proc + d_queue + d_trans + d_prop. Quale delle seguenti affermazioni caratterizza esattamente i contributi d_trans e d_prop?",
      "options": [
        {
          "origKey": "a",
          "text": "d_trans = d / v (dipende dalla lunghezza del cavo) e d_prop = L / R (dipende dal bit rate del link)."
        },
        {
          "origKey": "b",
          "text": "d_trans = L / R (tempo necessario a emettere tutti i bit sul canale) e d_prop = d / v (tempo impiegato dall'onda elettromagnetica a percorrere la tratta fisica)."
        },
        {
          "origKey": "c",
          "text": "Aumentando la banda da 10 Mbit/s a 1 Gbit/s si riduce proporzionalmente d_prop, mentre d_trans rimane invariato."
        },
        {
          "origKey": "d",
          "text": "d_prop è nullo nelle fibre ottiche poiché la velocità della luce nel silicio è infinita."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 00 & Cap. 02 (Ritardi e Prestazioni)",
      "explanation": [
        "<strong>Ritardo di trasmissione ($d_{\\text{trans}} = L / R$):</strong> tempo impiegato dal trasmettitore per 'pompare' tutti gli $L$ bit del pacchetto sul link alla frequenza di cifra $R$.",
        "<strong>Ritardo di propagazione ($d_{\\text{prop}} = d / v$):</strong> tempo impiegato dal fronte d'onda per viaggiare lungo la distanza $d$ del mezzo trasmissivo alla velocità della luce nel mezzo $v$ (circa $2 \\cdot 10^8\\unit{m/s}$ in rame/fibra, $3 \\cdot 10^8\\unit{m/s}$ in vuoto/aria).",
        "Aumentare il bit rate $R$ riduce drasticamente $d_{\\text{trans}}$, ma non ha alcun effetto su $d_{\\text{prop}}$ che dipende unicamente dalla distanza geografica e dalla fisica del canale."
      ],
      "wrongReasons": "Inverte le due formule ({{opt:a}}); l'aumento di banda riduce $d_{\\text{trans}}$, non $d_{\\text{prop}}$ ({{opt:c}}); in fibra $v \\approx 200\\,000\\unit{km/s}$, non infinita ({{opt:d}})."
    },
    {
      "id": 205,
      "custom": true,
      "difficulty": "medio",
      "title": "Prodotto Banda-Ritardo (Bandwidth-Delay Product - BDP)",
      "topic": "fondamenti",
      "question": "Un canale punto-punto ha capacità R = 100 Mbit/s e un Round-Trip Time RTT = 50 ms. Qual è il valore del Prodotto Banda-Ritardo (BDP) e cosa rappresenta fisicamente?",
      "options": [
        {
          "origKey": "a",
          "text": "BDP = 5 Mbit (circa 625 kB); rappresenta il volume massimo di bit che possono essere contemporaneamente \"in volo\" sul canale prima di ricevere un riscontro."
        },
        {
          "origKey": "b",
          "text": "BDP = 2 Mbit; rappresenta il numero massimo di connessioni TCP apribili contemporaneamente."
        },
        {
          "origKey": "c",
          "text": "BDP = 500 byte; rappresenta la dimensione minima dell'header IP per evitare frammentazione."
        },
        {
          "origKey": "d",
          "text": "BDP = 50 Gbit; rappresenta la capacità massima del buffer di memoria RAM del router."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 00 & Cap. 02 (BDP)",
      "explanation": [
        "Il <strong>Bandwidth-Delay Product (BDP)</strong> si calcola come:<br><code>BDP = R · RTT = (100 · 10^6 bit/s) · (50 · 10^-3 s) = 5 · 10^6 bit = 5 Mbit</code>.",
        "In byte corrisponde a: <code>5 · 10^6 / 8 = 625 000 byte ≈ 625 kB</code>.",
        "Fisicamente rappresenta la capacità volumetrica del canale (il 'tubo pieno'): se la finestra del protocollo di trasporto affidabile è inferiore al BDP, il trasmettitore sarà costretto a fermarsi in attesa di ACK, lasciando il canale parzialmente inutilizzato."
      ],
      "wrongReasons": "Le opzioni ({{opt:b}}), ({{opt:c}}) e ({{opt:d}}) riportano valori numerici errati e significati inventati."
    },
    {
      "id": 206,
      "custom": true,
      "difficulty": "difficile",
      "title": "Intensità di Traffico Dati e Asintoto di Accodamento (M/M/1)",
      "topic": "fondamenti",
      "question": "Sia I = (lambda * L) / R l'intensità di traffico su un buffer di trasmissione di un router. Cosa accade al ritardo medio di accodamento (d_queue) quando I si avvicina a 1?",
      "options": [
        {
          "origKey": "a",
          "text": "Il ritardo di accodamento rimane costante e pari a L/R grazie al controllo di flusso hardware."
        },
        {
          "origKey": "b",
          "text": "Il ritardo di accodamento cresce asintoticamente verso infinito a causa della variabilità stocastica negli arrivi dei pacchetti."
        },
        {
          "origKey": "c",
          "text": "Il ritardo di accodamento decresce poiché il canale raggiunge l'efficienza massima unitaria al 100%."
        },
        {
          "origKey": "d",
          "text": "I pacchetti vengono smistati istantaneamente senza toccare la memoria RAM."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 02 Sez. 1.5 (Teoria delle Code)",
      "explanation": [
        "L'intensità di traffico dati è $I = \\frac{\\lambda L}{R}$, dove $\\lambda$ è il tasso medio di arrivo (pacchetti/s), $L$ la dimensione media e $R$ la capacità del canale.",
        "Nella teoria delle code (modello $M/M/1$), il ritardo medio totale nel nodo è proporzionale a $\\frac{1}{1 - I}$.",
        "Quando $I \\to 1$ (il traffico in ingresso eguaglia la capacità del canale), le fluttuazioni statistiche casuali negli arrivi provocano l'accumulo inesorabile dei pacchetti, facendo tendere il ritardo medio e la lunghezza della coda a <strong>infinito</strong> ($d_{\\text{queue}} \\to \\infty$). Nei buffer reali finiti, questo si traduce in saturazione del buffer e massiccio scarto dei pacchetti (*packet drop*)."
      ],
      "wrongReasons": "Non rimane costante ({{opt:a}}); non decresce ({{opt:c}}); i buffer servono proprio ad assorbire i picchi ({{opt:d}})."
    },
    {
      "id": 207,
      "custom": true,
      "difficulty": "medio",
      "title": "Commutazione di Circuito vs Commutazione di Pacchetto",
      "topic": "fondamenti",
      "question": "Qual è la differenza fondamentale tra la commutazione di circuito (es. rete telefonica tradizionale) e la commutazione di pacchetto (es. Internet)?",
      "options": [
        {
          "origKey": "a",
          "text": "La commutazione di circuito dedica risorse fisse e riservate (canale fisico o slot TDM/FDM) per tutta la durata della sessione, mentre la commutazione di pacchetto usa multiplazione statistica condividendo le risorse su richiesta (*store-and-forward*)."
        },
        {
          "origKey": "b",
          "text": "La commutazione di circuito suddivide i dati in datagrammi indipendenti senza instradamento fisso."
        },
        {
          "origKey": "c",
          "text": "La commutazione di pacchetto richiede sempre una fase preliminare di segnalazione per bloccare la banda prima di inviare qualsiasi bit."
        },
        {
          "origKey": "d",
          "text": "La commutazione di circuito è immune a qualsiasi attenuazione fisica del segnale radio o ottico."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 02 Sez. 5 (Tecniche di Commutazione)",
      "explanation": [
        "Nella <strong>commutazione di circuito</strong> viene stabilito un percorso fisico o logico dedicato (*call setup*); le risorse rimangono riservate anche nei momenti di silenzio (inefficienza per traffico a raffica), garantendo banda costante e ritardo deterministico.",
        "Nella <strong>commutazione di pacchetto</strong> i dati vengono divisi in pacchetti instradati tramite <strong>multiplazione statistica</strong> e meccanismo <em>store-and-forward</em>: le risorse sono occupate solo durante l'emissione effettiva dei bit, permettendo l'overbooking e un utilizzo molto più efficiente del link."
      ],
      "wrongReasons": "I datagrammi indipendenti sono tipici della commutazione di pacchetto ({{opt:b}}); la commutazione di pacchetto pura (datagramma) non richiede blocco preliminare della banda ({{opt:c}}); l'attenuazione fisica affligge qualsiasi canale ({{opt:d}})."
    },
    {
      "id": 208,
      "custom": true,
      "difficulty": "facile",
      "title": "Topologie di Rete e Calcolo degli Archi",
      "topic": "fondamenti",
      "question": "In una rete con N nodi interconnessi, quanti collegamenti punto-punto bidirezionali sono necessari per realizzare rispettivamente una topologia a Maglia Completa (Full Mesh) e una topologia ad Albero (Tree)?",
      "options": [
        {
          "origKey": "a",
          "text": "Maglia Completa: N · (N − 1) / 2; Albero: N − 1."
        },
        {
          "origKey": "b",
          "text": "Maglia Completa: N; Albero: N^2."
        },
        {
          "origKey": "c",
          "text": "Maglia Completa: 2N; Albero: N / 2."
        },
        {
          "origKey": "d",
          "text": "Maglia Completa: N − 1; Albero: N · (N − 1) / 2."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 02 Sez. 4 (Topologie di Rete)",
      "explanation": [
        "Una <strong>topologia a maglia completa</strong> collega ogni nodo con tutti gli altri $N-1$ nodi: il numero di canali non orientati è la combinazione semplice $\\binom{N}{2} = \\frac{N(N-1)}{2}$. Garantisce la massima ridondanza ma ha costo quadratico $O(N^2)$.",
        "Una <strong>topologia ad albero</strong> è un grafo connesso e privo di cicli: il numero minimo di canali per garantire connettività tra tutti gli $N$ nodi è esattamente <strong>C = N − 1</strong>."
      ],
      "wrongReasons": "Invertono le formule o riportano valori geometricamente assurdi ({{opt:b}}, {{opt:c}}, {{opt:d}})."
    },
    {
      "id": 209,
      "custom": true,
      "difficulty": "difficile",
      "title": "Gerarchia degli ISP: Tier-1, Accordi di Peering vs Transit",
      "topic": "fondamenti",
      "question": "Nel contesto della gerarchia globale degli Internet Service Provider (ISP), quale delle seguenti definizioni descrive accuratamente la relazione tra accordi di Peering e Transit?",
      "options": [
        {
          "origKey": "a",
          "text": "Nel Transit due ISP scambiano solo traffico dei propri clienti gratuitamente; nel Peering un ISP paga l'altro per raggiungere l'intera Internet."
        },
        {
          "origKey": "b",
          "text": "Nel Peering due reti scambiano traffico bilaterale tra i rispettivi clienti tipicamente a costo zero (*settlement-free*) presso gli Internet Exchange Point (IXP), mentre nel Transit un ISP cliente paga un ISP provider a monte per accedere all'intera tabella di instradamento globale."
        },
        {
          "origKey": "c",
          "text": "Gli ISP Tier-1 sono costretti a pagare accordi di Transit a tutti gli ISP regionali Tier-2."
        },
        {
          "origKey": "d",
          "text": "Il Peering richiede l'apertura di tunnel crittografici IPsec obbligatori per legge."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 01 Sez. 2.3 (Gerarchia degli ISP)",
      "explanation": [
        "<strong>Transit:</strong> accordo commerciale asimmetrico cliente-fornitore; il cliente paga il provider Tier-1/Tier-2 per farsi instradare il traffico verso e da qualsiasi destinazione di Internet (accesso globale).",
        "<strong>Peering:</strong> accordo simmetrico (*settlement-free*) tra due ISP di pari livello o content provider che si collegano direttamente (spesso presso un <strong>IXP</strong>, <em>Internet Exchange Point</em>) per scambiarsi traffico destinato esclusivamente ai propri clienti, riducendo i costi di transito.",
        "Gli <strong>ISP Tier-1</strong> non pagano il transito a nessuno: formano una maglia completa di peering tra loro al vertice di Internet."
      ],
      "wrongReasons": "Inverte transit e peering ({{opt:a}}); i Tier-1 non comprano transit da nessuno ({{opt:c}}); non c'entra con tunnel IPsec ({{opt:d}})."
    },
    {
      "id": 210,
      "custom": true,
      "difficulty": "medio",
      "title": "Framing: Vulnerabilità del Metodo Character Count",
      "topic": "collegamento",
      "question": "Nel livello di collegamento, qual è il principale svantaggio del metodo di delimitazione delle trame basato su Character Count (Conteggio dei Caratteri)?",
      "options": [
        {
          "origKey": "a",
          "text": "Se un errore di trasmissione altera il campo conteggio, il ricevitore perde la sincronizzazione dell'inizio e della fine della trama corrente e di tutte le trame successive (*catastrophic framing desynchronization*)."
        },
        {
          "origKey": "b",
          "text": "Richiede una CPU dedicata a 64 bit all'interno del cavo di rame."
        },
        {
          "origKey": "c",
          "text": "Funziona solo su trame di dimensione fissa esattamente pari a 64 byte."
        },
        {
          "origKey": "d",
          "text": "Impedisce l'invio di caratteri ASCII stampabili nel payload."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 4.1 (Character Count)",
      "explanation": [
        "Nel <strong>Character Count</strong>, il primo campo dell'header della trama indica il numero totale di caratteri/byte della trama stessa.",
        "Se un bit del campo conteggio viene corrotto dal rumore, il ricevitore leggerà una lunghezza errata e cercherà l'inizio della trama successiva nel punto sbagliato del flusso.",
        "Questo provoca una <strong>perdita catastrofica di sincronizzazione</strong> che si propaga a valanga a tutti i frame successivi finché non interviene un reset di livello superiore."
      ],
      "wrongReasons": "Non richiede CPU nel cavo ({{opt:b}}); il conteggio serviva proprio per frame a lunghezza variabile ({{opt:c}}); trasporta qualsiasi dato ({{opt:d}})."
    },
    {
      "id": 211,
      "custom": true,
      "difficulty": "medio",
      "title": "Framing: Meccanismo di Byte Stuffing (Character Stuffing)",
      "topic": "collegamento",
      "question": "Nel Byte Stuffing (o Character Stuffing), per delimitare la trama si usano byte speciali di FLAG. Se nel payload applicativo compare casualmente la sequenza di byte corrispondente a FLAG o al carattere di escape DLE, come si comporta il trasmettitore?",
      "options": [
        {
          "origKey": "a",
          "text": "Scarta la trama e richiede all'applicazione di rigenerare dati che non contengano FLAG."
        },
        {
          "origKey": "b",
          "text": "Inserisce un byte di escape (DLE) prima di ogni occorrenza di FLAG o DLE presente nei dati; il ricevitore, riconoscendo il DLE, lo rimuove e interpreta il byte successivo come dato puro."
        },
        {
          "origKey": "c",
          "text": "Inverte tutti i bit del payload per evitare la corrispondenza con FLAG."
        },
        {
          "origKey": "d",
          "text": "Sostituisce il FLAG con un byte nullo 0x00 senza informare il ricevitore."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 03 Sez. 4.2 (Byte Stuffing)",
      "explanation": [
        "Per garantire la <strong>trasparenza del dato</strong>, se il payload contiene un byte uguale al <code>FLAG</code> (che indica inizio/fine trama), il trasmettitore vi antepone un carattere di escape <code>DLE</code> (<em>Data Link Escape</em>).",
        "Se nel payload compare lo stesso carattere <code>DLE</code>, il trasmettitore inserisce un secondo <code>DLE</code> (<code>DLE DLE</code>).",
        "Il ricevitore effettua l'operazione inversa (*byte destuffing*): quando incontra un singolo <code>DLE</code>, lo rimuove e accetta il byte seguente come dato trasparente ordinario."
      ],
      "wrongReasons": "Il protocollo deve essere trasparente, non scartare i dati ({{opt:a}}); non inverte i bit ({{opt:c}}); non altera silenziosamente il contenuto ({{opt:d}})."
    },
    {
      "id": 212,
      "custom": true,
      "difficulty": "difficile",
      "title": "Framing: Bit Stuffing nel Protocollo HDLC",
      "topic": "collegamento",
      "question": "Nel protocollo HDLC, le trame sono delimitate dalla sequenza flag 01111110 (sei '1' consecutivi tra due '0'). Come opera l'algoritmo di Bit Stuffing per garantire la trasparenza binaria?",
      "options": [
        {
          "origKey": "a",
          "text": "Il trasmettitore inserisce automaticamente un bit '0' dopo ogni sequenza di cinque bit '1' consecutivi nel corpo della trama; il ricevitore, se rileva cinque '1' seguiti da uno '0', scarta lo '0' ripristinando il dato originale."
        },
        {
          "origKey": "b",
          "text": "Il trasmettitore inserisce un bit '1' dopo ogni sequenza di cinque bit '0' consecutivi."
        },
        {
          "origKey": "c",
          "text": "Se il trasmettitore trova sei '1' consecutivi, calcola il complemento a due dell'intera trama."
        },
        {
          "origKey": "d",
          "text": "Il trasmettitore trasmette solo caratteri a 7 bit riservando l'ottavo bit come parità."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 4.3 (Bit Stuffing HDLC)",
      "explanation": [
        "Il flag di inizio/fine in HDLC è <code>01111110</code> (0, sei '1', 0).",
        "Per impedire che il payload generi accidentalmente questo flag, il trasmettitore osserva il flusso: ogni volta che incontra <strong>cinque '1' consecutivi</strong>, inserisce tassativamente un bit <strong>'0'</strong> (<em>bit stuffing</em>).",
        "All'arrivo, il ricevitore esamina il flusso: se vede cinque '1' seguiti da uno '0', <strong>elimina quello '0'</strong> (*destuffing*); se invece vede cinque '1' seguiti da un sesto '1' e poi uno '0', riconosce il vero <code>FLAG</code> di chiusura trama (se seguito da sette o più '1' segnala errore di <em>abort</em>)."
      ],
      "wrongReasons": "Si inserisce uno '0' dopo cinque '1', non viceversa ({{opt:b}}); non usa complementi a due ({{opt:c}}); opera a livello di singoli bit arbitrari, non su caratteri a 7 bit ({{opt:d}})."
    },
    {
      "id": 213,
      "custom": true,
      "difficulty": "medio",
      "title": "Distanza di Hamming Minima e Capacità di Rilevazione/Correzione",
      "topic": "collegamento",
      "question": "Dato un codice a blocchi con distanza di Hamming minima d_min = 5, quanti errori a singolo bit è in grado rispettivamente di rilevare o di correggere?",
      "options": [
        {
          "origKey": "a",
          "text": "Rileva fino a 4 errori; corregge fino a 2 errori."
        },
        {
          "origKey": "b",
          "text": "Rileva fino a 5 errori; corregge fino a 5 errori."
        },
        {
          "origKey": "c",
          "text": "Rileva fino a 2 errori; corregge fino a 4 errori."
        },
        {
          "origKey": "d",
          "text": "Rileva solo 1 errore; non è in grado di correggere alcun errore."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 5 (Codici di Hamming)",
      "explanation": [
        "La <strong>Distanza di Hamming minima ($d_{\\min}$)</strong> tra due parole di codice valide è il numero minimo di bit in cui differiscono.",
        "<strong>Rilevazione:</strong> per rilevare fino a $e$ errori occorre che nessuna parola errata coincida con un'altra parola valida, quindi $d_{\\min} \\ge e + 1 \\implies e = d_{\\min} - 1 = 5 - 1 = 4$ errori rilevabili.",
        "<strong>Correzione:</strong> per correggere fino a $t$ errori, le sfere di Hamming di raggio $t$ attorno alle parole valide non devono sovrapporsi, quindi $d_{\\min} \\ge 2t + 1 \\implies t = \\lfloor (d_{\\min} - 1) / 2 \\rfloor = \\lfloor 4 / 2 \\rfloor = 2$ errori correggibili."
      ],
      "wrongReasons": "Invertono le relazioni o ignorano la disuguaglianza fondamentale $d_{\\min} \\ge 2t+1$ ({{opt:b}}, {{opt:c}}, {{opt:d}})."
    },
    {
      "id": 214,
      "custom": true,
      "difficulty": "difficile",
      "title": "Proprietà Matematiche del Polinomio Generatore CRC",
      "topic": "collegamento",
      "question": "Nel calcolo del CRC (Cyclic Redundancy Check) basato su aritmetica polinomiale in GF(2), quali proprietà deve possedere il polinomio generatore G(x) per rilevare tutti gli errori a singolo bit e tutti gli errori composti da un numero dispari di bit invertiti?",
      "options": [
        {
          "origKey": "a",
          "text": "Deve avere termine noto x^0 = 1 (non divisibile per x) per i singoli bit, e contenere il fattore (x + 1) per tutti gli errori dispari."
        },
        {
          "origKey": "b",
          "text": "Deve essere un monomio del tipo x^k senza termini intermedi."
        },
        {
          "origKey": "c",
          "text": "Deve essere composto esclusivamente da coefficienti negativi in base 10."
        },
        {
          "origKey": "d",
          "text": "Deve avere grado inferiore alla dimensione del pacchetto IP."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 5.3 (Polinomi Generatori CRC)",
      "explanation": [
        "Un errore a singolo bit corrisponde a un polinomio $E(x) = x^i$. Perché il resto della divisione $E(x) / G(x)$ sia diverso da zero per qualsiasi $i$, $G(x)$ non deve dividere $x^i$, il che richiede che $G(x)$ abbia <strong>termine noto non nullo ($x^0 = 1$)</strong>.",
        "Un errore con numero dispari di bit invertiti soddisfa $E(1) = 1$ in $GF(2)$. Se $G(x)$ possiede come fattore <strong>$(x + 1)$</strong>, allora qualsiasi suo multiplo $Q(x)G(x)$ valutato in $x=1$ dà $Q(1) \\cdot (1+1) = Q(1) \\cdot 0 = 0$, rendendo matematicamente impossibile che $G(x)$ divida un $E(x)$ dispari.",
        "Tutti i CRC industriali standard (es. CRC-32 IEEE 802.3) soddisfano queste proprietà."
      ],
      "wrongReasons": "Un monomio $x^k$ non rileva errori consecutivi ({{opt:b}}); l'algebra è in GF(2) con coefficienti in {0, 1} senza numeri negativi ({{opt:c}}); il grado di $G(x)$ corrisponde al numero di bit di controllo (es. 32), non alla dimensione IP ({{opt:d}})."
    },
    {
      "id": 215,
      "custom": true,
      "difficulty": "medio",
      "title": "Struttura dell'Indirizzo MAC a 48 bit e Significato dei Primi Bit",
      "topic": "collegamento",
      "question": "Un indirizzo MAC Ethernet (IEEE 802) ha una dimensione di 48 bit (6 byte). Qual è il significato dei primi 24 bit e del bit meno significativo del primo ottetto?",
      "options": [
        {
          "origKey": "a",
          "text": "I primi 24 bit identificano l'interfaccia IP del router; il bit meno significativo indica la versione del protocollo TCP."
        },
        {
          "origKey": "b",
          "text": "I primi 24 bit costituiscono l'OUI (Organizationally Unique Identifier) assegnato dall'IEEE al produttore hardware; il bit meno significativo del primo ottetto (bit I/G) distingue tra indirizzo unicast (0) e multicast/broadcast (1)."
        },
        {
          "origKey": "c",
          "text": "I primi 24 bit sono assegnati dal server DHCP locale durante la procedura Discover."
        },
        {
          "origKey": "d",
          "text": "Tutti i 48 bit sono generati casualmente dall'host ad ogni riavvio della scheda di rete."
        }
      ],
      "correctKey": "b",
      "refs": "IEEE 802.3 & Appunti TLC - Cap. 03",
      "explanation": [
        "L'indirizzo MAC (48 bit) si divide in: <strong>primi 24 bit (OUI)</strong>, assegnati dall'IEEE al costruttore della scheda (es. Intel, Cisco), e <strong>ultimi 24 bit</strong>, serializzati dal produttore per identificare univocamente la scheda.",
        "Nel primo byte, il bit meno significativo (<strong>bit I/G</strong>, <em>Individual/Group</em>) vale: <code>0</code> per indirizzi unicast (destinati a una sola interfaccia) e <code>1</code> per indirizzi di gruppo (multicast o broadcast <code>FF:FF:FF:FF:FF:FF</code>).",
        "Il secondo bit meno significativo (<strong>bit U/L</strong>, <em>Universal/Local</em>) specifica se l'indirizzo è globale IEEE (0) o amministrato localmente (1)."
      ],
      "wrongReasons": "Non c'entra con IP/TCP ({{opt:a}}); non è assegnato da DHCP ({{opt:c}}); è inciso in fabbrica dal produttore ({{opt:d}})."
    },
    {
      "id": 216,
      "custom": true,
      "difficulty": "facile",
      "title": "Collocazione Architetturale del Data Link: NIC vs Kernel Space",
      "topic": "collegamento",
      "question": "In un moderno sistema di calcolo, dove risiede fisicamente l'implementazione del livello di collegamento dati (MAC e framing)?",
      "options": [
        {
          "origKey": "a",
          "text": "È implementato direttamente nell'hardware/firmware della scheda di rete (NIC - Network Interface Card), che interagisce con il kernel del sistema operativo tramite interrupt e canali DMA (Direct Memory Access)."
        },
        {
          "origKey": "b",
          "text": "È eseguito interamente in user space all'interno dell'applicazione web del browser."
        },
        {
          "origKey": "c",
          "text": "È implementato esclusivamente nel router di default dell'ISP."
        },
        {
          "origKey": "d",
          "text": "È simulato dal compilatore C++ in fase di compilazione del programma."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 2.2 (Collocazione Architetturale NIC)",
      "explanation": [
        "A differenza dei livelli superiori (Rete e Trasporto, che risiedono nel <strong>kernel space</strong> del sistema operativo, e Applicazione in <strong>user space</strong>), il livello di collegamento (MAC/Fisico) è collocato nell'<strong>hardware della scheda di rete (NIC)</strong>.",
        "A velocità elevate (es. 10 Gbit/s e superiori), la CPU centrale non potrebbe elaborare bit per bit il framing, il calcolo del CRC e il controllo di accesso senza saturarsi; la NIC esegue queste operazioni in hardware e trasferisce le trame nella memoria RAM tramite <strong>DMA</strong>."
      ],
      "wrongReasons": "Non risiede in user space nel browser ({{opt:b}}); la scheda locale dell'host implementa il data link locale ({{opt:c}}); è un sottosistema hardware/firmware reale ({{opt:d}})."
    },
    {
      "id": 217,
      "custom": true,
      "difficulty": "medio",
      "title": "Le Tre Classi di Servizio Offerte dal Data Link al Livello di Rete",
      "topic": "collegamento",
      "question": "Quale delle seguenti corrispondenze tra classe di servizio di Livello 2 e tecnologia di rete reale è corretta?",
      "options": [
        {
          "origKey": "a",
          "text": "Servizio non connesso e non riscontrato: Wi-Fi 802.11; Servizio connesso e riscontrato: Ethernet."
        },
        {
          "origKey": "b",
          "text": "Servizio non connesso e non riscontrato: Ethernet (basso tasso d'errore su cavo); Servizio non connesso con riscontro: Wi-Fi 802.11 (canale radio rumoroso e soggetto a fading)."
        },
        {
          "origKey": "c",
          "text": "Tutti i protocolli di livello 2 implementano obbligatoriamente il servizio connesso con riscontro numerato."
        },
        {
          "origKey": "d",
          "text": "Nessun protocollo di livello 2 può inviare riscontri (ACK)."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 03 Sez. 3 (Tre Classi di Servizio)",
      "explanation": [
        "<strong>1. Non connesso e non riscontrato:</strong> ideale per canali affidabili (cavi rame e fibra ottica come in <strong>Ethernet</strong>); se una trama è corrotta viene scartata senza ACK, delegando l'affidabilità a TCP.",
        "<strong>2. Non connesso con riscontro (ACK):</strong> necessario su canali rumorosi e instabili come il <strong>Wi-Fi (IEEE 802.11)</strong>; se la trama non riceve l'ACK di livello 2 viene ritrasmessa subito localmente senza aspettare i lunghi timeout di TCP.",
        "<strong>3. Connesso con riscontro:</strong> stabilisce connessione logica a livello 2 (es. vecchi link HDLC punto-punto)."
      ],
      "wrongReasons": "Inverte Ethernet e Wi-Fi ({{opt:a}}); Ethernet non è orientato alla connessione ({{opt:c}}); Wi-Fi invia ACK a livello 2 ({{opt:d}})."
    },
    {
      "id": 218,
      "custom": true,
      "difficulty": "difficile",
      "title": "Controllo di Parità Bidimensionale (2D Parity Check)",
      "topic": "collegamento",
      "question": "In uno schema di controllo degli errori con Parità Incrociata Bidimensionale (disposizione dei dati in una matrice con bit di parità su ciascuna riga e su ciascuna colonna), quali sono le capacità esatte di rilevazione e correzione?",
      "options": [
        {
          "origKey": "a",
          "text": "È in grado di correggere univocamente qualsiasi errore a singolo bit (all'incrocio della riga e della colonna che falliscono la parità) e di rilevare con certezza fino a 3 errori a singolo bit."
        },
        {
          "origKey": "b",
          "text": "Non è in grado di correggere alcun errore e rileva solo errori a burst superiori a 100 bit."
        },
        {
          "origKey": "c",
          "text": "Corregge fino a 10 errori qualsiasi purché consecutivi."
        },
        {
          "origKey": "d",
          "text": "La matrice bidimensionale ha distanza di Hamming d_min = 1."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 5.1 (Parità Bidimensionale)",
      "explanation": [
        "Nella parità bidimensionale, i bit sono disposti in una matrice $M \\times N$ e si aggiunge un bit di parità per ogni riga e per ogni colonna.",
        "Se si verifica <strong>1 solo errore</strong>, esattamente una riga e una colonna avranno parità violata: la cella all'intersezione individua univocamente il bit errato, che viene corretto invertendolo.",
        "La distanza minima del codice è $d_{\\min} = 4$. Pertanto rileva con certezza qualsiasi combinazione fino a $d_{\\min} - 1 = 3$ errori."
      ],
      "wrongReasons": "La parità 2D corregge gli errori singoli ({{opt:b}}); non corregge 10 errori ({{opt:c}}); se avesse d_min=1 non rileverebbe nulla ({{opt:d}})."
    },
    {
      "id": 219,
      "custom": true,
      "difficulty": "medio",
      "title": "ALOHA Puro: Periodo Vulnerabile e Throughput Massimo",
      "topic": "collegamento",
      "question": "Nel protocollo di accesso casuale ALOHA Puro (senza slot temporali), dato T_tx il tempo di trasmissione di una trama, qual è l'intervallo di vulnerabilità per una collisione e qual è l'efficienza massima teorica del canale?",
      "options": [
        {
          "origKey": "a",
          "text": "Intervallo di vulnerabilità pari a 2 · T_tx; throughput massimo pari a S_max = 1 / (2e) ≈ 18.4% raggiunto per carico G = 0.5."
        },
        {
          "origKey": "b",
          "text": "Intervallo di vulnerabilità pari a 1 · T_tx; throughput massimo pari a S_max = 1 / e ≈ 36.8% raggiunto per carico G = 1."
        },
        {
          "origKey": "c",
          "text": "Intervallo di vulnerabilità nullo; throughput pari al 100%."
        },
        {
          "origKey": "d",
          "text": "Intervallo di vulnerabilità pari a 4 · T_tx; throughput massimo pari al 50%."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 6.1 (ALOHA Puro)",
      "explanation": [
        "In <strong>ALOHA Puro</strong>, se una stazione inizia a trasmettere all'istante $t_0$, ci sarà collisione se qualsiasi altra stazione inizia a trasmettere nell'intervallo $(t_0 - T_{tx}, t_0 + T_{tx})$: l'intervallo di vulnerabilità ha durata <strong>$2 T_{tx}$</strong>.",
        "Assumendo arrivi di Poisson con carico $G$, la probabilità che non vi siano altre trasmissioni in $2 T_{tx}$ è $e^{-2G}$.",
        "La legge di throughput è <code>S = G · e^(-2G)</code>. Derivando rispetto a $G$ si trova il massimo per $G = 0.5$, dove <code>S_max = 0.5 · e^(-1) = 1 / (2e) ≈ 0.184 (18.4%)</code>."
      ],
      "wrongReasons": "Vulnerabilità $T_{tx}$ e 36.8% si riferiscono a Slotted ALOHA ({{opt:b}}); l'intervallo non è nullo ({{opt:c}}); valori errati ({{opt:d}})."
    },
    {
      "id": 220,
      "custom": true,
      "difficulty": "medio",
      "title": "Slotted ALOHA: Vincoli di Sincronizzazione e Throughput Raddoppiato",
      "topic": "collegamento",
      "question": "In che modo lo Slotted ALOHA raddoppia l'efficienza massima rispetto all'ALOHA Puro, raggiungendo circa il 36.8%?",
      "options": [
        {
          "origKey": "a",
          "text": "Aumentando la potenza di emissione delle antenne radio di un fattore 4."
        },
        {
          "origKey": "b",
          "text": "Suddividendo il tempo in slot discreti sincronizzati pari a T_tx e imponendo che le trasmissioni inizino solo all'inizio di ogni slot, dimezzando l'intervallo di vulnerabilità a T_tx (legge S = G · e^(-G))."
        },
        {
          "origKey": "c",
          "text": "Eliminando totalmente la possibilità di collisioni sul canale."
        },
        {
          "origKey": "d",
          "text": "Obbligando le stazioni ad ascoltare il canale prima di trasmettere (Carrier Sense)."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 03 Sez. 6.2 (Slotted ALOHA)",
      "explanation": [
        "Nello <strong>Slotted ALOHA</strong> le stazioni trasmettono solo all'inizio dei 'time slot' discreti di durata $T_{tx}$.",
        "Se due trame collidono, collidono per intero nello stesso slot; non è più possibile che una trama urti la coda o la testa di un'altra. L'intervallo di vulnerabilità si dimezza da $2 T_{tx}$ a <strong>$T_{tx}$</strong>.",
        "La probabilità di successo diventa $e^{-G}$ e il throughput è <code>S = G · e^(-G)</code>, con massimo in $G = 1$ pari a <code>S_max = 1/e ≈ 0.368 (36.8%)</code>."
      ],
      "wrongReasons": "Non dipende dalla potenza RF ({{opt:a}}); le collisioni possono ancora verificarsi se due stazioni scelgono lo stesso slot ({{opt:c}}); l'ascolto prima della trasmissione è proprio del CSMA, non di Slotted ALOHA ({{opt:d}})."
    },
    {
      "id": 221,
      "custom": true,
      "difficulty": "difficile",
      "title": "CSMA p-persistente e il Ruolo dei Micro-slot di Contesa",
      "topic": "collegamento",
      "question": "Nel protocollo CSMA p-persistente formulato da Kleinrock e Tobagi (1975) e analizzato a lezione, qual è il funzionamento esatto quando una stazione rileva il canale occupato e quale ruolo svolgono i \"micro-slot\"?",
      "options": [
        {
          "origKey": "a",
          "text": "I micro-slot dividono l'intero asse temporale in intervalli pari a T_tx esattamente come in Slotted ALOHA per sincronizzare le trasmissioni."
        },
        {
          "origKey": "b",
          "text": "La stazione attende che il canale si liberi; quando il canale torna libero, il tempo viene scandito in micro-slot tau << T_tx (tempo di contesa): la stazione trasmette subito con probabilità p, oppure con probabilità 1 - p rinvia la decisione al micro-slot successivo."
        },
        {
          "origKey": "c",
          "text": "La stazione trasmette immediatamente a prescindere dallo stato del canale con probabilità p."
        },
        {
          "origKey": "d",
          "text": "La stazione esegue un backoff fisso di 1 ora prima di ritentare l'accesso."
        }
      ],
      "correctKey": "b",
      "refs": "Appunti TLC - Cap. 03 Sez. 6.3 & Nota del Docente Kleinrock-Tobagi 1975",
      "explanation": [
        "Come espressamente sottolineato dal docente: la formulazione originale di <strong>Kleinrock e Tobagi (1975)</strong> per il <strong>CSMA p-persistente</strong> assume che alla fine di una trasmissione (quando il canale si libera) il tempo venga scandito in <strong>micro-slot di contesa $\\tau \\ll T_{tx}$</strong>.",
        "Questi micro-slot non hanno nulla a che vedere con Slotted ALOHA: servono unicamente a gestire la contesa all'uscita dall'occupazione (molto simile al meccanismo degli slot time del CSMA/CA di Wi-Fi).",
        "La stazione valuta il canale: con probabilità <strong>$p$</strong> trasmette subito nello slot; con probabilità <strong>$1 - p$</strong> rimanda la decisione allo slot successivo. Se nello slot successivo il canale è ancora libero, ripete la procedura probabilistica; se un'altra stazione ha iniziato a trasmettere, si arresta come se fosse occupato."
      ],
      "wrongReasons": "Non divide l'asse temporale in slot pari a $T_{tx}$ come in Slotted ALOHA ({{opt:a}}, errore comune chiarito dal docente); non trasmette se il canale è occupato ({{opt:c}}); ritardi irragionevoli ({{opt:d}})."
    },
    {
      "id": 222,
      "custom": true,
      "difficulty": "medio",
      "title": "CSMA 1-persistente vs CSMA Non-persistente",
      "topic": "collegamento",
      "question": "Confrontando il CSMA 1-persistente e il CSMA Non-persistente, quale delle seguenti affermazioni descrive correttamente il trade-off prestazionale tra i due?",
      "options": [
        {
          "origKey": "a",
          "text": "Il CSMA 1-persistente ha ritardo di accesso inferiore a basso carico ma causa collisioni certe se due o più stazioni attendono la fine della stessa trasmissione; il CSMA Non-persistente riduce drasticamente le collisioni ad alto carico ma introduce ritardi più elevati a basso carico."
        },
        {
          "origKey": "b",
          "text": "Il CSMA 1-persistente non colliderebbe mai perché usa token ring virtuali."
        },
        {
          "origKey": "c",
          "text": "Il CSMA Non-persistente ha throughput sempre nullo pari a zero."
        },
        {
          "origKey": "d",
          "text": "Entrambi hanno efficienza identica a quella di ALOHA Puro."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 03 Sez. 6.3 (Confronto Varianti CSMA)",
      "explanation": [
        "<strong>1-persistente:</strong> ascolta il canale; se occupato, attende continuamente e non appena il canale si libera <strong>trasmette con probabilità 1</strong>. Se due stazioni hanno generato dati durante la trasmissione in corso, trasmetteranno entrambe simultaneamente non appena il canale si libera, <strong>collidendo con probabilità 1</strong>.",
        "<strong>Non-persistente:</strong> se trova il canale occupato, non rimane in ascolto continuo, ma attende un tempo casuale estratto da una distribuzione prima di riascoltare. Riduce moltissimo le collisioni al liberarsi del canale (maggiore throughput ad alto carico), ma se il canale si libera durante l'attesa casuale il link rimane vuoto, aumentando il ritardo medio."
      ],
      "wrongReasons": "1-persistente causa collisioni garantite se due stazioni erano in attesa ({{opt:b}}); il non-persistente raggiunge throughput elevati ad alto carico ({{opt:c}}); CSMA supera di gran lunga ALOHA grazie al carrier sensing ({{opt:d}})."
    },
    {
      "id": 223,
      "custom": true,
      "difficulty": "difficile",
      "title": "CSMA/CD: Condizione Fondamentale T_tx >= 2*T_p e Lunghezza Minima del Frame",
      "topic": "collegamento",
      "question": "In una rete Ethernet a bus condiviso che adotta CSMA/CD, per quale ragione la durata della trama deve soddisfare tassativamente la condizione T_tx >= 2 * T_p (dove T_p è il tempo di propagazione massimo end-to-end)?",
      "options": [
        {
          "origKey": "a",
          "text": "Per consentire alla stazione trasmittente di rilevare l'eventuale collisione prima di terminare l'emissione dei bit della trama stessa sul canale."
        },
        {
          "origKey": "b",
          "text": "Per permettere al router di default di convertire l'indirizzo MAC in indirizzo IPv6."
        },
        {
          "origKey": "c",
          "text": "Perché le schede di rete non possiedono clock con precisione inferiore a 2 * T_p."
        },
        {
          "origKey": "d",
          "text": "Per raddoppiare la banda disponibile sul cavo coassiale."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3 & Appunti TLC - Cap. 03 Sez. 7 (CSMA/CD)",
      "explanation": [
        "Nel caso peggiore, una stazione A trasmette a $t=0$; il segnale arriva alla stazione B all'estremo opposto all'istante $t = T_p - \\epsilon$. B sente il canale ancora libero e trasmette, generando collisione.",
        "L'effetto della collisione viaggia a ritroso verso A e giunge ad A solo all'istante $t \\approx 2 T_p$ (*Round-Trip Propagation Time* o *slot time*).",
        "Se la trama durasse meno di $2 T_p$ ($T_{tx} < 2 T_p$), A avrebbe già terminato di trasmettere e considererebbe il pacchetto inviato con successo, non potendo accorgersi della distruzione della trama.",
        "Da questa condizione nasce la <strong>dimensione minima del frame Ethernet ($64\\unit{byte} = 512\\unit{bit}$)</strong>."
      ],
      "wrongReasons": "Non riguarda la conversione MAC/IPv6 ({{opt:b}}); non riguarda la frequenza del clock ({{opt:c}}); non raddoppia la banda fisica ({{opt:d}})."
    },
    {
      "id": 224,
      "custom": true,
      "difficulty": "medio",
      "title": "Algoritmo di Backoff Esponenziale Binario (BEB) in Ethernet",
      "topic": "collegamento",
      "question": "In Ethernet CSMA/CD, in cosa consiste l'algoritmo Binary Exponential Backoff (BEB) applicato dopo una collisione?",
      "options": [
        {
          "origKey": "a",
          "text": "La stazione raddoppia la dimensione del pacchetto dopo ogni collisione per forzare il passaggio."
        },
        {
          "origKey": "b",
          "text": "Dopo k collisioni consecutive (con k <= 10), la stazione estrae un tempo di attesa casuale r slot time, dove r è un intero scelto uniformemente nell'intervallo [0, 2^k - 1]."
        },
        {
          "origKey": "c",
          "text": "La stazione moltiplica per 10 la frequenza di trasmissione della scheda di rete."
        },
        {
          "origKey": "d",
          "text": "La stazione si disconnette definitivamente dalla rete al secondo tentativo fallito."
        }
      ],
      "correctKey": "b",
      "refs": "IEEE 802.3 & Appunti TLC - Cap. 03 Sez. 7.2 (BEB)",
      "explanation": [
        "Al primo tentativo fallito ($k=1$), la stazione sceglie $r \\in \\{0, 1\\}$ slot time.",
        "Al secondo fallimento consecutivo ($k=2$), l'intervallo raddoppia a $\\{0, 1, 2, 3\\}$ ($2^2 - 1 = 3$).",
        "In generale, dopo $k$ collisioni sceglie casualmente tra <code>[0, 2^min(k, 10) - 1]</code> intervalli slot time ($51.2\\unit{\\mu s}$).",
        "Questo meccanismo adatta dinamicamente il tempo di attesa al livello di contesa della rete: se molte stazioni tentano di trasmettere contemporaneamente, l'intervallo si allarga esponenzialmente riducendo la probabilità di ricollisione immediata. Dopo 16 collisioni la trama viene scartata."
      ],
      "wrongReasons": "Non raddoppia la dimensione della trama ({{opt:a}}); non altera la frequenza di bit rate ({{opt:c}}); il limite massimo è 16 tentativi prima dello scarto ({{opt:d}})."
    },
    {
      "id": 225,
      "custom": true,
      "difficulty": "medio",
      "title": "Perché il Wi-Fi (802.11) adotta CSMA/CA invece di CSMA/CD",
      "topic": "collegamento",
      "question": "Per quale motivo fondamentale le reti senza fili Wi-Fi (IEEE 802.11) adottano il protocollo CSMA/CA (Collision Avoidance) invece del CSMA/CD (Collision Detection) usato nelle reti cablate Ethernet?",
      "options": [
        {
          "origKey": "a",
          "text": "Perché un ricetrasmettitore radio non può rilevare collisioni mentre trasmette, dato che la potenza del proprio segnale emesso sovrasta e acceca il ricevitore locale, rendendo impossibile rilevare segnali di collisione deboli provenienti da altre stazioni."
        },
        {
          "origKey": "b",
          "text": "Perché lo standard Wi-Fi non supporta le trasmissioni broadcast."
        },
        {
          "origKey": "c",
          "text": "Perché il ritardo di propagazione radio nell'aria è nullo e quindi non possono verificarsi collisioni."
        },
        {
          "origKey": "d",
          "text": "Perché le frequenze a 2.4 GHz e 5 GHz vietano per legge l'ascolto della portante."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.11 & Appunti TLC - Cap. 03 Sez. 8 (CSMA/CA)",
      "explanation": [
        "In un ricetrasmettitore radio wireless, la potenza del segnale emesso dall'antenna locale è immensamente superiore (spesso di vari ordini di grandezza, oltre $60-90\\unit{dB}$) rispetto ai segnali ricevuti da stazioni remote.",
        "Durante la trasmissione, la stazione radio 'acceca' il proprio ricevitore (*self-interference*): non è tecnicamente in grado di fare <strong>Collision Detection (CD)</strong> affidabile.",
        "Inoltre, nelle reti radio esistono i problemi del <strong>terminale nascosto</strong> e del <strong>terminale esposto</strong>, che rendono inefficace il rilevamento diretto della collisione. Si adotta quindi il <strong>Collision Avoidance (CA)</strong> con spazi interframe (DIFS, SIFS), backoff preventivo e opzionale handshake RTS/CTS."
      ],
      "wrongReasons": "Il Wi-Fi supporta il broadcast ({{opt:b}}); nell'aria $v = 300\\,000\\unit{km/s}$, non infinita ({{opt:c}}); il carrier sense è parte integrante di CSMA/CA ({{opt:d}})."
    },
    {
      "id": 226,
      "custom": true,
      "difficulty": "difficile",
      "title": "Il Problema del Terminale Nascosto e Meccanismo RTS/CTS in 802.11",
      "topic": "collegamento",
      "question": "Nelle reti wireless IEEE 802.11, in cosa consiste il \"Problema del Terminale Nascosto\" e come viene risolto dall'handshake opzionale RTS/CTS?",
      "options": [
        {
          "origKey": "a",
          "text": "Due stazioni A e C sono fuori dalla reciproca portata radio ma entrambe vicine all'Access Point B: trasmettendo contemporaneamente verso B collidono; con RTS/CTS, B invia un CTS in broadcast che annuncia la prenotazione del canale a tutte le stazioni (NAV), silenziando C durante la trasmissione di A."
        },
        {
          "origKey": "b",
          "text": "È un problema di sicurezza crittografica risolto impostando una password WPA2 complessa."
        },
        {
          "origKey": "c",
          "text": "Riguarda l'impossibilità di collegare host con indirizzi IP privati senza NAT."
        },
        {
          "origKey": "d",
          "text": "Due stazioni si sentono ma non riescono a sentire l'Access Point a causa di un muro di piombo."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.11 & Appunti TLC - Cap. 03 Sez. 8.2 (RTS/CTS e NAV)",
      "explanation": [
        "<strong>Terminale Nascosto:</strong> la stazione A sente B (l'AP); la stazione C sente B; ma A e C non si sentono tra loro. Se A sta trasmettendo a B, C fa carrier sensing, sente il canale libero e trasmette a sua volta a B, distruggendo entrambi i frame su B.",
        "<strong>Soluzione RTS/CTS:</strong> A invia un piccolo frame <em>Request to Send (RTS)</em> a B. Se B è libero, risponde con un <em>Clear to Send (CTS)</em> trasmesso a piena potenza.",
        "C riceve il CTS da B e legge nel campo durata il <strong>Network Allocation Vector (NAV)</strong>: imposta il proprio timer interno e rimane in silenzio fino al termine della trasmissione di A, eliminando la collisione."
      ],
      "wrongReasons": "Non riguarda WPA2 o password ({{opt:b}}); non riguarda IP o NAT ({{opt:c}}); se non sentono l'AP non possono comunicare ({{opt:d}})."
    },
    {
      "id": 227,
      "custom": true,
      "difficulty": "medio",
      "title": "Spazi Interframe in Wi-Fi 802.11: Differenza tra SIFS e DIFS",
      "topic": "collegamento",
      "question": "Nello standard IEEE 802.11, quale relazione intercorre tra l'intervallo temporale SIFS (Short Interframe Space) e il DIFS (Distributed Interframe Space)?",
      "options": [
        {
          "origKey": "a",
          "text": "SIFS < DIFS; questa differenza garantisce priorità assoluta ai messaggi di controllo critici (come gli ACK e i CTS) rispetto alle nuove trasmissioni di dati ordinari."
        },
        {
          "origKey": "b",
          "text": "SIFS > DIFS; per rallentare gli ACK e permettere l'accumulo dei buffer."
        },
        {
          "origKey": "c",
          "text": "SIFS = DIFS = 0; non esiste alcuna attesa tra frame consecutivi in Wi-Fi."
        },
        {
          "origKey": "d",
          "text": "SIFS si applica solo sui cavi Ethernet, DIFS solo sui ponti radio."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.11 & Appunti TLC - Cap. 03 Sez. 8.1 (Spazi Interframe)",
      "explanation": [
        "In Wi-Fi, le priorità di accesso al canale condiviso sono regolate dalla durata dei tempi di silenzio obbligatorio tra frame (*Interframe Spaces*):",
        "<strong>SIFS (Short IFS):</strong> è l'intervallo più breve. Viene utilizzato per messaggi che devono ottenere il canale senza contesa, come l'<strong>ACK</strong> immediato del ricevitore o la risposta <strong>CTS</strong> all'RTS.",
        "<strong>DIFS (Distributed IFS):</strong> è più lungo (<code>DIFS = SIFS + 2 · SlotTime</code>). Una stazione che vuole trasmettere una nuova trama dati deve attendere che il canale sia libero per almeno un intero DIFS prima di avviare il backoff.",
        "Poiché <code>SIFS < DIFS</code>, una stazione in attesa di ACK prenderà sempre il canale prima che chiunque altro possa iniziare una nuova trasmissione dati."
      ],
      "wrongReasons": "SIFS è più breve di DIFS, non più lungo ({{opt:b}}); non sono nulli ({{opt:c}}); sono entrambi specifici dello standard radio IEEE 802.11 ({{opt:d}})."
    },
    {
      "id": 228,
      "custom": true,
      "difficulty": "medio",
      "title": "Efficienza del Protocollo Stop-and-Wait su Canale con Alto BDP",
      "topic": "trasporto_app",
      "question": "Nel protocollo di trasferimento dati affidabile Stop-and-Wait ARQ, l'efficienza teorica di utilizzo del canale è data da eta = T_tx / (T_tx + 2 * T_p) = 1 / (1 + 2a), con a = T_p / T_tx. Cosa accade all'efficienza eta quando il collegamento presenta un elevato prodotto banda-ritardo (BDP)?",
      "options": [
        {
          "origKey": "a",
          "text": "L'efficienza crolla a valori vicini allo 0%, poiché il trasmettitore passa la maggior parte del tempo fermo inattivo in attesa dell'ACK dal ricevitore."
        },
        {
          "origKey": "b",
          "text": "L'efficienza tende al 100% poiché il canale ad alta velocità trasmette istantaneamente gli ACK."
        },
        {
          "origKey": "c",
          "text": "L'efficienza rimane costante al 50% indipendentemente dal ritardo di propagazione T_p."
        },
        {
          "origKey": "d",
          "text": "Il protocollo Stop-and-Wait converte automaticamente il canale in full-duplex senza ACK."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 04 Sez. 5 (Stop-and-Wait e Pipeline)",
      "explanation": [
        "In Stop-and-Wait, il trasmettitore invia 1 pacchetto (tempo $T_{tx} = L/R$) e si ferma finché non riceve l'ACK ($2 T_p$).",
        "Il tempo totale per un ciclo è $T_{tx} + 2 T_p$. L'efficienza è $\\eta = \\frac{T_{tx}}{T_{tx} + 2 T_p} = \\frac{1}{1 + 2 (T_p / T_{tx})}$.",
        "Se il canale ha banda alta (piccolo $T_{tx}$) e lunga distanza geografica (grande $T_p$, cioè grande BDP), il parametro $a = T_p / T_{tx} \\gg 1$, rendendo $\\eta \\to 0$.",
        "Esempio su link satellitare ($RTT = 500\\unit{ms}$, pacchetto da $1\\unit{KB}$ a $1\\unit{Gbit/s}$, $T_{tx} = 8\\unit{\\mu s}$): l'efficienza è inferiore allo $0.002\\%$. Per questo si usano i protocolli a finestra (pipelining: GBN, Selective Repeat, TCP)."
      ],
      "wrongReasons": "Non tende al 100% ({{opt:b}}); non rimane al 50% ({{opt:c}}); richiede sempre ACK per l'affidabilità ({{opt:d}})."
    },
    {
      "id": 229,
      "custom": true,
      "difficulty": "difficile",
      "title": "Go-Back-N vs Selective Repeat: Dimensione Massima della Finestra",
      "topic": "trasporto_app",
      "question": "In un protocollo a finestra scorrevole con numeri di sequenza rappresentati su k bit (aritmetica modulo 2^k), quali sono le dimensioni massime ammissibili della finestra di trasmissione W_T per Go-Back-N e Selective Repeat per evitare ambiguità nell'interpretazione degli ACK?",
      "options": [
        {
          "origKey": "a",
          "text": "Go-Back-N: W_T <= 2^k - 1 (con W_R = 1); Selective Repeat: W_T <= 2^(k - 1) (con W_T = W_R)."
        },
        {
          "origKey": "b",
          "text": "Go-Back-N: W_T <= 2^k; Selective Repeat: W_T <= 2^k."
        },
        {
          "origKey": "c",
          "text": "Go-Back-N: W_T = 1; Selective Repeat: W_T = 2^k - 1."
        },
        {
          "origKey": "d",
          "text": "Entrambi devono avere finestra limitata esattamente a k pacchetti."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 04 Sez. 6 & Sez. 7 (GBN e Selective Repeat)",
      "explanation": [
        "<strong>Go-Back-N ($W_R = 1$):</strong> il ricevitore accetta solo il pacchetto successivo in ordine. Perché il trasmettitore non confonda una serie di ACK persi con un ciclo successivo di numeri di sequenza, deve essere <code>W_T <= 2^k - 1</code>.",
        "<strong>Selective Repeat ($W_R = W_T$):</strong> il ricevitore memorizza anche i pacchetti fuori sequenza all'interno della propria finestra di ricezione. Perché la finestra di ricezione non si sovrapponga a numeri di sequenza del ciclo precedente ancora in volo, la somma deve essere $W_T + W_R \\le 2^k$. Con finestre simmetriche ($W_T = W_R$), si ottiene tassativamente <code>W_T <= 2^(k - 1)</code> (la metà dello spazio dei numeri di sequenza)."
      ],
      "wrongReasons": "Se $W_T = 2^k$ in GBN si ha ambiguità totale tra ACK nuovo e vecchio ({{opt:b}}); $W_T=1$ è Stop-and-Wait ({{opt:c}}); $k$ è il numero di bit, lo spazio è $2^k$ ({{opt:d}})."
    },
    {
      "id": 230,
      "custom": true,
      "difficulty": "medio",
      "title": "Lo Pseudo-Header nel Checksum UDP e TCP",
      "topic": "trasporto_app",
      "question": "Durante il calcolo dell'Internet Checksum a livello di trasporto per UDP e TCP, perché viene incluso uno \"Pseudo-Header\" contenente gli indirizzi IP sorgente e destinazione del livello di rete?",
      "options": [
        {
          "origKey": "a",
          "text": "Per verificare che il datagramma non sia stato recapitato all'host sbagliato a causa di errori non rilevati nell'header IP (garantendo l'integrità dell'instradamento end-to-end)."
        },
        {
          "origKey": "b",
          "text": "Perché il protocollo IP non ha un proprio checksum."
        },
        {
          "origKey": "c",
          "text": "Per crittografare il payload con chiave asimmetrica RSA a livello 4."
        },
        {
          "origKey": "d",
          "text": "Per raddoppiare il throughput della connessione TCP durante lo Slow Start."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 768 (UDP), RFC 9293 (TCP) & Appunti TLC - Cap. 04",
      "explanation": [
        "Lo <strong>Pseudo-Header</strong> è una struttura virtuale a 12 byte (in IPv4) composta da: IP Sorgente, IP Destinazione, byte di zeri, campo Protocollo (17 per UDP, 6 per TCP) e Lunghezza del segmento di trasporto.",
        "Non viene trasmesso sul canale: viene prepilato localmente dal mittente durante il calcolo del checksum e ricalcolato dal destinatario.",
        "Serve a verificare la corretta consegna: se un router corrompe l'IP di destinazione o il campo protocollo ma il checksum IP non lo rileva (o in IPv6 dove l'header IP non ha checksum), il livello trasporto rileverà che il segmento è finito all'host o al protocollo sbagliato e lo scarterà."
      ],
      "wrongReasons": "In IPv4 il checksum dell'header IP esiste ({{opt:b}}); non ha scopi crittografici ({{opt:c}}); non c'entra con Slow Start ({{opt:d}})."
    },
    {
      "id": 231,
      "custom": true,
      "difficulty": "difficile",
      "title": "TCP 4-Way Teardown e Significato dello Stato TIME_WAIT",
      "topic": "trasporto_app",
      "question": "Nella chiusura di una connessione TCP (4-way handshake con segmenti FIN e ACK), l'estremità che esegue la chiusura attiva entra nello stato TIME_WAIT e vi rimane per 2 * MSL (Maximum Segment Lifetime). A cosa serve questa attesa?",
      "options": [
        {
          "origKey": "a",
          "text": "Serve a garantire che l'ultimo ACK inviato raggiunga il destinatario (permettendogli di uscire dallo stato LAST_ACK se l'ACK andasse perso e venisse ritrasmesso il FIN) e ad assicurare che eventuali segmenti duplicati o ritardati della vecchia connessione svaniscano dalla rete prima di riutilizzare la stessa 4-upla di porte/IP."
        },
        {
          "origKey": "b",
          "text": "Serve a dare tempo all'applicazione utente di terminare la computazione in CPU senza interruzioni."
        },
        {
          "origKey": "c",
          "text": "Serve ad azzerare il router di default dell'ISP."
        },
        {
          "origKey": "d",
          "text": "Serve a verificare se il server possiede ancora spazio su disco fisso."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 9293 & Appunti TLC - Cap. 04 Sez. 10.3 (Chiusura TCP e TIME_WAIT)",
      "explanation": [
        "Lo stato <strong>TIME_WAIT</strong> (tipicamente $2 \\text{MSL} \\approx 1-2$ minuti) assolve due funzioni critiche di robustezza in TCP:",
        "<strong>1. Affidabilità della chiusura:</strong> se l'ultimo ACK di A andasse perso, B ritrasmetterebbe il suo <code>FIN</code>. Se A non fosse in TIME_WAIT, risponderebbe con un <code>RST</code> segnalando errore anomalo invece di confermare la chiusura pulita.",
        "<strong>2. Drenaggio dei pacchetti residui (*quiet time*):</strong> garantisce che tutti i segmenti vaganti della vecchia connessione (ritardati nei buffer dei router) muoiano nella rete prima che venga aperta una nuova connessione con la stessa identica coppia di socket (IP sorg/dest, porta sorg/dest)."
      ],
      "wrongReasons": "Non riguarda la CPU applicativa ({{opt:b}}); non resetta router ({{opt:c}}); non verifica dischi ({{opt:d}})."
    },
    {
      "id": 232,
      "custom": true,
      "difficulty": "difficile",
      "title": "Algoritmo di Karn per il Calcolo dell'RTO su Segmenti Ritrasmessi",
      "topic": "trasporto_app",
      "question": "Nel calcolo del Timeout di Ritrasmissione (RTO) di TCP, quale regola essenziale impone l'algoritmo di Karn?",
      "options": [
        {
          "origKey": "a",
          "text": "Non campionare mai il Round Trip Time (RTT) per segmenti che sono stati ritrasmessi (evitando l'ambiguità dell'ACK), e raddoppiare l'RTO (backoff esponenziale del timer) a ogni ritrasmissione consecutiva."
        },
        {
          "origKey": "b",
          "text": "Impostare l'RTO sempre a un valore statico costante pari a 10 secondi."
        },
        {
          "origKey": "c",
          "text": "Calcolare l'RTO sommando il tempo di elaborazione del kernel diviso per il numero di core della CPU."
        },
        {
          "origKey": "d",
          "text": "Ritrasmettere immediatamente il pacchetto ogni 1 millisecondo senza aspettare ACK."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 6298 & Appunti TLC - Cap. 04 Sez. 11 (Algoritmo di Karn)",
      "explanation": [
        "Se un segmento viene ritrasmesso e successivamente arriva un ACK, è impossibile sapere se l'ACK conferma la prima trasmissione (che aveva solo subìto forte ritardo) o la seconda (<strong>ambiguità di ACK</strong>).",
        "L'<strong>algoritmo di Karn</strong> stabilisce: <strong>1)</strong> non considerare mai campioni di RTT per pacchetti ritrasmessi per non inquinare le stime di SRTT e RTTVAR; <strong>2)</strong> raddoppiare l'RTO ad ogni timeout consecutivo (<code>RTO = 2 · RTO</code>, analogo al backoff esponenziale di Ethernet) per decongestionare la rete."
      ],
      "wrongReasons": "L'RTO è dinamico e adattativo, non statico ({{opt:b}}); non dipende dal numero di core della CPU ({{opt:c}}); non spamma pacchetti ogni ms ({{opt:d}})."
    },
    {
      "id": 233,
      "custom": true,
      "difficulty": "difficile",
      "title": "Silly Window Syndrome: Soluzione di Clark e Algoritmo di Nagle",
      "topic": "trasporto_app",
      "question": "La \"Silly Window Syndrome\" (SWS) è un fenomeno patologico che riduce il throughput di TCP a livelli minimi trasferendo segmenti con pochissimi byte di dati rispetto all'overhead di intestazione. Come viene risolta rispettivamente dal lato ricevitore e dal lato trasmettitore?",
      "options": [
        {
          "origKey": "a",
          "text": "Ricevitore: Soluzione di Clark (evita di annunciare incrementi di finestra inferiori a min(MSS, Buffer/2)); Trasmettitore: Algoritmo di Nagle (accumula i dati applicativi e li invia solo quando ha un intero MSS pronto o quando tutti gli ACK pendenti sono stati ricevuti)."
        },
        {
          "origKey": "b",
          "text": "Ricevitore: azzera la memoria RAM; Trasmettitore: invia segmenti UDP al posto di TCP."
        },
        {
          "origKey": "c",
          "text": "Entrambi disabilitano il controllo di flusso impostando RWND a infinito."
        },
        {
          "origKey": "d",
          "text": "Il ricevitore scarta tutti i pacchetti con payload inferiore a 1500 byte."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 896 (Nagle), RFC 1122 & Appunti TLC - Cap. 04 Sez. 12",
      "explanation": [
        "<strong>Silly Window Syndrome:</strong> se un'applicazione legge i dati 1 byte alla volta, il ricevitore TCP annuncia una finestra di ricezione $RWND = 1$ byte; il trasmettitore invia un pacchetto con 40 byte di header (20 IP + 20 TCP) per trasportare 1 solo byte di payload (efficienza $1/41 \\approx 2.4\\%$).",
        "<strong>Soluzione di Clark (Ricevitore):</strong> il ricevitore non annuncia mai una finestra di 1 byte, ma mantiene la finestra chiusa a 0 finché lo spazio disponibile nel buffer non diventa almeno pari a <code>min(MSS, SpazioBuffer/2)</code>.",
        "<strong>Algoritmo di Nagle (Trasmettitore):</strong> se l'applicazione genera piccoli frammenti di dati, il trasmettitore invia il primo frammento e accumula i successivi nel buffer; invia un nuovo pacchetto solo quando ha accumulato almeno <strong>1 MSS intero</strong> oppure quando ha ricevuto il riscontro (ACK) del segmento precedente."
      ],
      "wrongReasons": "Non passa a UDP ({{opt:b}}); RWND a infinito manderebbe in crash il buffer ({{opt:c}}); il ricevitore non scarta pacchetti corretti ({{opt:d}})."
    },
    {
      "id": 234,
      "custom": true,
      "difficulty": "medio",
      "title": "DNS: Risoluzione Iterativa vs Ricorsiva e Tipologie di Record",
      "topic": "trasporto_app",
      "question": "Nel Domain Name System (DNS), qual è la differenza fondamentale tra risoluzione ricorsiva e iterativa, e qual è il significato del Record di tipo CNAME?",
      "options": [
        {
          "origKey": "a",
          "text": "Nella ricorsiva il server interrogato si assume l'onere di risolvere l'intero percorso chiedendo agli altri server e ritornando la risposta finale al client; nell'iterativa risponde indicando l'IP del prossimo server da interrogare (referral). Il record CNAME definisce un alias per un nome canonico ufficiale."
        },
        {
          "origKey": "b",
          "text": "La risoluzione iterativa funziona solo su protocollo TCP, la ricorsiva solo su UDP."
        },
        {
          "origKey": "c",
          "text": "Il record CNAME serve esclusivamente ad associare un indirizzo IPv6 a un nome di dominio."
        },
        {
          "origKey": "d",
          "text": "I server radice (Root DNS) eseguono sempre risoluzioni ricorsive per tutti i client del mondo."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 1034, RFC 1035 & Appunti TLC - Cap. 05 Sez. 2",
      "explanation": [
        "<strong>Risoluzione Ricorsiva:</strong> tipica tra client (stub resolver) e il server DNS locale; il server locale prende in carico la richiesta e risponde solo quando ha ottenuto la traduzione completa.",
        "<strong>Risoluzione Iterativa:</strong> tipica tra server DNS locale e la gerarchia (Root, TLD, Autoritativi); il server Root o TLD non risolve direttamente il nome, ma ritorna al richiedente il riferimento (*referral*) al server competente del livello successivo ('Non so chi sia, ma chiedi a questo IP').",
        "<strong>Record CNAME (Canonical Name):</strong> mappa un nome alias (es. <code>www.unibs.it</code>) sul vero nome canonico (es. <code>server01.ict.unibs.it</code>). Per IPv6 si usa il record <strong>AAAA</strong> (non CNAME)."
      ],
      "wrongReasons": "Entrambe usano UDP porta 53 ({{opt:b}}); l'IPv6 usa record AAAA, CNAME è per gli alias ({{opt:c}}); i server root rifiutano la ricorsione per non saturarsi e rispondono solo in modo iterativo ({{opt:d}})."
    },
    {
      "id": 235,
      "custom": true,
      "difficulty": "difficile",
      "title": "Evoluzione di HTTP: Da HTTP/1.1 a HTTP/2 e HTTP/3 su QUIC",
      "topic": "trasporto_app",
      "question": "Quale problema architetturale critico presente in HTTP/2 su TCP è stato definitivamente risolto da HTTP/3 mediante l'adozione del protocollo di trasporto QUIC (su UDP)?",
      "options": [
        {
          "origKey": "a",
          "text": "L'Head-of-Line (HoL) Blocking a livello di trasporto TCP: in HTTP/2, poiché tutti gli stream applicativi viaggiano su un'unica connessione TCP, la perdita di un singolo pacchetto IP blocca tutti gli stream paralleli fino alla ritrasmissione; HTTP/3 su QUIC gestisce gli stream in modo indipendente."
        },
        {
          "origKey": "b",
          "text": "L'impossibilità di usare immagini in formato JPEG nelle pagine web."
        },
        {
          "origKey": "c",
          "text": "La mancata crittografia TLS che in HTTP/3 è stata eliminata per velocizzare i trasferimenti."
        },
        {
          "origKey": "d",
          "text": "Il superamento del limite dei 4 GB per singolo file trasferibile."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 7540 (HTTP/2), RFC 9000 (QUIC), RFC 9114 (HTTP/3) & Appunti TLC - Cap. 05 Sez. 3",
      "explanation": [
        "In <strong>HTTP/1.1</strong> esisteva l'HoL blocking a livello applicativo (richieste in pipelining dovevano essere risposte in ordine sequenziale).",
        "<strong>HTTP/2</strong> ha introdotto il <em>binary framing</em> e il <strong>multiplexing di stream indipendenti</strong> su una singola connessione TCP. Tuttavia, poiché per TCP esiste un solo flusso ordinato di byte, se un singolo pacchetto IP va perso nel canale, il ricevitore TCP blocca la consegna al browser di <em>tutti</em> i dati degli altri stream (<strong>Head-of-Line Blocking a livello trasporto</strong>).",
        "<strong>HTTP/3</strong> risolve questo difetto strutturale sostituendo TCP con <strong>QUIC</strong> (sopra UDP): gli stream sono isolati anche a livello trasporto; se un pacchetto dello stream A va perso, lo stream B continua a essere consegnato all'applicazione senza alcun ritardo."
      ],
      "wrongReasons": "Non riguarda il formato delle immagini ({{opt:b}}); QUIC integra TLS 1.3 obbligatorio fin dal primo byte dell'handshake ({{opt:c}}); non riguarda limiti di 4 GB ({{opt:d}})."
    },
    {
      "id": 236,
      "custom": true,
      "difficulty": "medio",
      "title": "Architetture Applicative: Scalabilità Client-Server vs Peer-to-Peer (P2P)",
      "topic": "trasporto_app",
      "question": "Nel problema della distribuzione di un file di dimensione F a N client, come si confrontano le proprietà di scalabilità del tempo minimo di distribuzione nel paradigma Client-Server rispetto al paradigma Peer-to-Peer (P2P come BitTorrent)?",
      "options": [
        {
          "origKey": "a",
          "text": "Nel Client-Server il tempo minimo di distribuzione cresce linearmente con N (scala come O(N)) a causa della capacità di upload finita del server; nel P2P il tempo di distribuzione si stabilizza asintoticamente (crescita logaritmica/costante) poiché ogni nuovo client contribuisce con la propria banda di upload."
        },
        {
          "origKey": "b",
          "text": "Il Client-Server scala meglio del P2P all'aumentare dei client poiché il server diventa più veloce man mano che riceve richieste."
        },
        {
          "origKey": "c",
          "text": "Il P2P non può mai trasferire file di dimensioni superiori a 1 Megabyte."
        },
        {
          "origKey": "d",
          "text": "In entrambi i casi il tempo di distribuzione è rigorosamente indipendente dal numero di client N."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 05 Sez. 1.4 (Architetture Client-Server vs P2P)",
      "explanation": [
        "<strong>Modello Client-Server:</strong> il server deve trasmettere $N$ copie del file: il tempo per servire $N$ client è almeno $D_{\\text{CS}} \\ge \\max \\left( \\frac{F}{u_s}, \\frac{F}{d_{\\min}}, \\frac{N \\cdot F}{u_s} \\right)$. All'aumentare di $N$, il tempo cresce linearmente con $N$ ($O(N)$), saturando l'uplink del server $u_s$.",
        "<strong>Modello P2P:</strong> ogni peer scarica chunk del file e contemporaneamente li ri-condivide in upload con gli altri peer. La capacità aggregata del sistema cresce con $N$: $D_{\\text{P2P}} \\ge \\max \\left( \\frac{F}{u_s}, \\frac{F}{d_{\\min}}, \\frac{N \\cdot F}{u_s + \\sum u_i} \\right)$.",
        "All'aumentare dei client, la capacità di upload totale della rete cresce di pari passo con la domanda, rendendo il P2P intrinsecamente auto-scalabile."
      ],
      "wrongReasons": "Il client-server non scala meglio all'aumentare di N ({{opt:b}}); P2P distribuisce file giganti ({{opt:c}}); nel client-server dipende linearmente da N ({{opt:d}})."
    },
    {
      "id": 237,
      "custom": true,
      "difficulty": "facile",
      "title": "Multiplexing TDM vs FDM",
      "topic": "fondamenti",
      "question": "Qual è la differenza fondamentale tra la multiplazione FDM (Frequency Division Multiplexing) e la multiplazione TDM (Time Division Multiplexing)?",
      "options": [
        {
          "origKey": "a",
          "text": "FDM divide la banda spettrale del canale in sottobande di frequenza dedicate separate da bande di guardia; TDM suddivide il tempo in frame ciclici con time-slot assegnati a turno a ciascuna sorgente."
        },
        {
          "origKey": "b",
          "text": "FDM trasmette solo pacchetti IP, TDM solo trame Ethernet."
        },
        {
          "origKey": "c",
          "text": "TDM richiede antenne paraboliche, FDM funziona solo su doppino in rame."
        },
        {
          "origKey": "d",
          "text": "In FDM tutti gli utenti trasmettono contemporaneamente sulla stessa frequenza senza divisione spettrale."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 02 Sez. 5 (Multiplazione)",
      "explanation": [
        "In <strong>FDM (Frequency Division Multiplexing)</strong> l'ampiezza di banda analogica $B$ viene ripartita in porzioni di frequenza fisse assegnate ai diversi utenti; per evitare interferenze adiacenti si inseriscono *bande di guardia*.",
        "In <strong>TDM (Time Division Multiplexing)</strong> l'intera banda è a disposizione di un singolo utente alla volta per un breve intervallo (*time slot*); gli slot si ripetono ciclicamente all'interno di una trama temporale (*frame*)."
      ],
      "wrongReasons": "Entrambi sono metodi generali di multiplazione del livello fisico indipendenti da IP/Ethernet ({{opt:b}}); non dipendono dal mezzo fisico specifico ({{opt:c}}); in FDM le frequenze sono separate ({{opt:d}})."
    },
    {
      "id": 238,
      "custom": true,
      "difficulty": "medio",
      "title": "La Legge di Little nei Sistemi di Coda (N = lambda * T)",
      "topic": "fondamenti",
      "question": "Nella teoria dei sistemi di telecomunicazione e delle code, cosa stabilisce la Legge di Little (N = lambda · T)?",
      "options": [
        {
          "origKey": "a",
          "text": "Il numero medio di pacchetti presenti nel sistema (N) è pari al tasso medio di arrivo (lambda) moltiplicato per il tempo medio di permanenza di un pacchetto nel sistema (T)."
        },
        {
          "origKey": "b",
          "text": "Il ritardo di propagazione è proporzionale al quadrato della capacità di banda del router."
        },
        {
          "origKey": "c",
          "text": "La probabilità di perdita di un pacchetto è sempre inferiore al 10%."
        },
        {
          "origKey": "d",
          "text": "Il numero di hop di routing non può mai superare lambda diviso T."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 02 Sez. 1.5 (Legge di Little)",
      "explanation": [
        "La <strong>Legge di Little</strong> è un teorema fondamentale valido per qualsiasi sistema di accodamento stabile, indipendente dalla distribuzione degli arrivi o del tempo di servizio:",
        "<code>N = λ · T</code>",
        "dove $N$ è il numero medio di elementi nel sistema, $\\lambda$ è il tasso medio di arrivo e $T$ è il tempo medio di permanenza (attesa in coda + tempo di trasmissione)."
      ],
      "wrongReasons": "Non riguarda il ritardo di propagazione ({{opt:b}}); non stima perdite di pacchetti ({{opt:c}}); non riguarda il numero di hop ({{opt:d}})."
    },
    {
      "id": 239,
      "custom": true,
      "difficulty": "facile",
      "title": "Canali Simplex, Half-Duplex e Full-Duplex",
      "topic": "fondamenti",
      "question": "Quale delle seguenti definizioni distingue correttamente le modalità di comunicazione Simplex, Half-Duplex e Full-Duplex?",
      "options": [
        {
          "origKey": "a",
          "text": "Simplex: trasmissione rigorosamente unidirezionale (es. broadcast radio/TV); Half-Duplex: bidirezionale ma alternata nel tempo (es. walkie-talkie o Ethernet a bus); Full-Duplex: bidirezionale e simultanea nello stesso istante (es. Ethernet su switch con canali Tx/Rx separati)."
        },
        {
          "origKey": "b",
          "text": "Half-Duplex trasmette a metà della velocità della luce, Full-Duplex alla velocità massima."
        },
        {
          "origKey": "c",
          "text": "Simplex supporta fino a 10 utenti contemporanei, Full-Duplex solo 2."
        },
        {
          "origKey": "d",
          "text": "Tutti i canali radio Wi-Fi moderni operano nativamente in modalità Full-Duplex simultanea sulla stessa frequenza."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 02 Sez. 3.2 (Modalità di Comunicazione)",
      "explanation": [
        "<strong>Simplex:</strong> l'informazione viaggia solo in una direzione (trasmettitore fisso e ricevitore fisso).",
        "<strong>Half-Duplex:</strong> entrambi i nodi possono trasmettere e ricevere, ma non contemporaneamente (condivisione nel tempo del canale).",
        "<strong>Full-Duplex:</strong> trasmissione e ricezione simultanee indipendenti senza collisioni (es. Ethernet moderno commutato con coppie di fili o fibre dedicate per Tx e Rx)."
      ],
      "wrongReasons": "Non c'entra con la velocità della luce ({{opt:b}}); non riguarda il numero di utenti ({{opt:c}}); il Wi-Fi radio classico opera in half-duplex per evitare auto-interferenza ({{opt:d}})."
    },
    {
      "id": 240,
      "custom": true,
      "difficulty": "medio",
      "title": "Multiplazione Statica vs Multiplazione Statistica (Overbooking)",
      "topic": "fondamenti",
      "question": "Si consideri un link con capacità C = 10 Mbit/s e N utenti ciascuno dei quali richiede R = 1 Mbit/s ma è attivo solo per il 10% del tempo (p = 0.1). Come differiscono la commutazione di circuito e la commutazione di pacchetto?",
      "options": [
        {
          "origKey": "a",
          "text": "La commutazione di circuito può allocare al massimo C / R = 10 utenti dedicati; la commutazione di pacchetto può supportare molti più utenti (es. 35 utenti) sfruttando la multiplazione statistica (overbooking), con probabilità di congestione simultanea trascurabile."
        },
        {
          "origKey": "b",
          "text": "La commutazione di pacchetto può supportare al massimo 1 utente alla volta."
        },
        {
          "origKey": "c",
          "text": "La commutazione di circuito adatta dinamicamente la banda raddoppiandola per ogni nuovo utente."
        },
        {
          "origKey": "d",
          "text": "Entrambe supportano esattamente lo stesso numero di utenti pari a 10."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 02 Sez. 5 (Multiplazione Statistica)",
      "explanation": [
        "In <strong>commutazione di circuito</strong>, ogni utente ottiene $1\\unit{Mbit/s}$ garantito: su $10\\unit{Mbit/s}$ possono collegarsi solo $10/1 = 10$ utenti.",
        "In <strong>commutazione di pacchetto</strong>, poiché ciascun utente trasmette solo per il $10\\%$ del tempo, con 35 utenti la probabilità che più di 10 utenti trasmettano simultaneamente (calcolata con la coda della distribuzione binomiale) è inferiore allo $0.0004$ ($0.04\\%$).",
        "La multiplazione statistica consente quindi un utilizzo enormemente più efficiente del link per traffico a raffica (*bursty traffic*)."
      ],
      "wrongReasons": "La commutazione di pacchetto supporta molti più utenti ({{opt:b}}); la capacità fisica del link è fissa a 10 Mbit/s ({{opt:c}}); non supportano lo stesso numero di utenti ({{opt:d}})."
    },
    {
      "id": 241,
      "custom": true,
      "difficulty": "medio",
      "title": "Tempo di Trasferimento Store-and-Forward Multi-Hop con Pipelining",
      "topic": "fondamenti",
      "question": "Un file di dimensione complessiva F viene frammentato in P pacchetti di dimensione L bit e trasmesso attraverso H collegamenti punto-punto in cascata identici (H hop), ciascuno con frequenza di cifra R e ritardo di propagazione trascurabile. Qual è il tempo totale di trasferimento trascurando il ritardo di elaborazione?",
      "options": [
        {
          "origKey": "a",
          "text": "T_tot = (H + P − 1) · (L / R)."
        },
        {
          "origKey": "b",
          "text": "T_tot = H · P · (L / R)."
        },
        {
          "origKey": "c",
          "text": "T_tot = (H · L) / (P · R)."
        },
        {
          "origKey": "d",
          "text": "T_tot = P · (L / R) indipendente dal numero di hop H."
        }
      ],
      "correctKey": "a",
      "refs": "Appunti TLC - Cap. 02 Sez. 5.2 (Pipelining dei Pacchetti)",
      "explanation": [
        "Il primo pacchetto impiega $H \\cdot (L/R)$ per attraversare tutti gli $H$ router in cascata (store-and-forward su ogni hop).",
        "Grazie al <strong>pipelining</strong> (mentre il secondo router inoltra il pacchetto 1, il primo router sta già trasmettendo il pacchetto 2), ciascuno dei restanti $P - 1$ pacchetti giunge a destinazione a intervalli regolari di $L/R$.",
        "Il tempo totale è quindi: <code>T_tot = H · (L/R) + (P − 1) · (L/R) = (H + P − 1) · (L/R)</code>.",
        "Senza frammentazione (singolo pacchetto $F$), il tempo sarebbe $H \\cdot (F/R) = H \\cdot P \\cdot (L/R)$, molto superiore."
      ],
      "wrongReasons": "$H \\cdot P \\cdot (L/R)$ è il tempo senza frammentazione ({{opt:b}}); formule non coerenti dimensionalmente ({{opt:c}}, {{opt:d}})."
    },
    {
      "id": 242,
      "custom": true,
      "difficulty": "medio",
      "title": "Spanning Tree Protocol (STP - IEEE 802.1D)",
      "topic": "collegamento",
      "question": "A quale scopo fondamentale viene impiegato lo Spanning Tree Protocol (STP) nelle reti locali Ethernet commutate con switch ridondanti?",
      "options": [
        {
          "origKey": "a",
          "text": "Disabilita selettivamente le porte ridondanti per rompere i loop fisici ed evitare broadcast storm e duplicazione infinita delle trame, mantenendo un albero logico aciclico di copertura."
        },
        {
          "origKey": "b",
          "text": "Assegna indirizzi IP dinamici agli switch tramite broadcast."
        },
        {
          "origKey": "c",
          "text": "Crittografa le trame Ethernet con algoritmo AES-256."
        },
        {
          "origKey": "d",
          "text": "Converte automaticamente le trame Ethernet in celle ATM a 53 byte."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.1D & Appunti TLC - Cap. 03",
      "explanation": [
        "Nelle reti Ethernet, se vi sono collegamenti fisici ridondanti (loop), una trama di broadcast (come una richiesta ARP) verrebbe replicata all'infinito dagli switch, provocando un <strong>broadcast storm</strong> che satura i link e corrompe le tabelle MAC (*MAC table thrashing*).",
        "L'algoritmo <strong>Spanning Tree (STP)</strong> elegge un <em>Root Bridge</em> e pone in stato di blocco (*blocking*) i collegamenti ridondanti, lasciando attivo un solo percorso aciclico (albero). Se un link attivo fallisce, STP sblocca automaticamente una porta di riserva."
      ],
      "wrongReasons": "Non assegna indirizzi IP (compito di DHCP, {{opt:b}}); non riguarda la crittografia ({{opt:c}}); non converte in ATM ({{opt:d}})."
    },
    {
      "id": 243,
      "custom": true,
      "difficulty": "medio",
      "title": "Codifica Manchester e Manchester Differenziale",
      "topic": "collegamento",
      "question": "Qual è il principale vantaggio e il principale svantaggio della codifica di linea Manchester impiegata nell'Ethernet a 10 Mbit/s (10BASE-T)?",
      "options": [
        {
          "origKey": "a",
          "text": "Vantaggio: presenta una transizione al centro di ogni bit che consente l'estrazione sicura del clock (auto-sincronizzazione) e annulla la componente continua; Svantaggio: richiede una frequenza di segnalazione doppia (Baud rate = 2 · Bit rate), dimezzando l'efficienza spettrale."
        },
        {
          "origKey": "b",
          "text": "Vantaggio: quadruplica la velocità di trasmissione del canale; Svantaggio: funziona solo su fibra ottica."
        },
        {
          "origKey": "c",
          "text": "Vantaggio: non produce calore nei cavi di rame; Svantaggio: richiede pacchetti di dimensione fissa a 1500 byte."
        },
        {
          "origKey": "d",
          "text": "Non presenta alcuna transizione durante la trasmissione di sequenze di bit '0'."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3 & Appunti TLC - Cap. 03 (Codifiche di Linea)",
      "explanation": [
        "Nella <strong>codifica Manchester</strong>, un bit '1' è rappresentato da una transizione alto->basso e uno '0' da basso->alto al centro del periodo di bit.",
        "<strong>Vantaggio:</strong> ogni bit garantisce una transizione di livello logico, permettendo al ricevitore di sincronizzare il proprio clock ed evitando derive su lunghe sequenze di '0' o '1' consecutivi.",
        "<strong>Svantaggio:</strong> per trasmettere $10\\unit{Mbit/s}$ occorrono fino a $20\\unit{Mbaud}$ (20 milioni di transizioni al secondo), richiedendo il doppio della banda analogica rispetto a una codifica NRZ pura."
      ],
      "wrongReasons": "Non quadruplica la velocità ({{opt:b}}); non c'entra con la dissipazione termica o la dimensione fissa ({{opt:c}}); garantisce transizioni per ogni bit, inclusi gli '0' ({{opt:d}})."
    },
    {
      "id": 244,
      "custom": true,
      "difficulty": "difficile",
      "title": "Codifica a Blocchi 4B/5B in Fast Ethernet",
      "topic": "collegamento",
      "question": "Perché lo standard Fast Ethernet (100BASE-TX) ha sostituito la codifica Manchester con la codifica a blocchi 4B/5B abbinata a NRZI?",
      "options": [
        {
          "origKey": "a",
          "text": "Per ridurre l'overhead di banda dal 100% (della codifica Manchester) al solo 25%: mappa quartetti di 4 bit in simboli a 5 bit che garantiscono almeno due transizioni, richiedendo solo 125 Mbaud per trasmettere 100 Mbit/s."
        },
        {
          "origKey": "b",
          "text": "Per consentire la trasmissione di 5 byte contemporaneamente su doppino telefonico."
        },
        {
          "origKey": "c",
          "text": "Per eliminare la necessità del checksum CRC nelle trame."
        },
        {
          "origKey": "d",
          "text": "Per convertire il segnale in frequenze FM analogiche."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3u & Appunti TLC - Cap. 03",
      "explanation": [
        "A $100\\unit{Mbit/s}$, la codifica Manchester avrebbe richiesto $200\\unit{Mbaud}$, insostenibile sui cavi in rame UTP Cat 5.",
        "La <strong>codifica 4B/5B</strong> mappa blocchi di 4 bit di dati su parole a 5 bit scelte in modo che non vi siano mai più di tre zeri consecutivi. Questo introduce un overhead di solo <code>5/4 = 1.25 (25%)</code>.",
        "Il flusso a $125\\unit{Mbit/s}$ viene poi modulato con NRZI (transizione in corrispondenza dell'1), assicurando frequenti transizioni per il clock e limitando la banda richiesta a $125\\unit{Mbaud}$."
      ],
      "wrongReasons": "Mappa 4 bit su 5 bit, non 5 byte ({{opt:b}}); il CRC rimane indispensabile ({{opt:c}}); è una codifica di banda base digitale, non FM ({{opt:d}})."
    },
    {
      "id": 245,
      "custom": true,
      "difficulty": "medio",
      "title": "Ethernet II vs IEEE 802.3: Interpretazione del Campo EtherType/Length",
      "topic": "collegamento",
      "question": "Nel formato della trama Ethernet, come fa la scheda di rete a distinguere se i 2 byte posizionati dopo gli indirizzi MAC rappresentano la Lunghezza del payload (IEEE 802.3) o il Tipo di Protocollo (EtherType - Ethernet II)?",
      "options": [
        {
          "origKey": "a",
          "text": "Se il valore numerico è maggiore o uguale a 0x0600 (1536 decimale) rappresenta l'EtherType (es. 0x0800 per IPv4, 0x0806 per ARP); se è minore o uguale a 1500 (0x05DC) rappresenta la lunghezza del payload."
        },
        {
          "origKey": "b",
          "text": "Se il bit di parità è 0 è Ethernet II, se è 1 è IEEE 802.3."
        },
        {
          "origKey": "c",
          "text": "Dipende esclusivamente dalla tensione elettrica misurata sul cavo (5V vs 12V)."
        },
        {
          "origKey": "d",
          "text": "Lo switch invia un pacchetto speciale ICMP prima di ogni trama per avvisare la scheda."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3 / RFC 894 & Appunti TLC - Cap. 03",
      "explanation": [
        "La dimensione massima del payload Ethernet (MTU) è <strong>1500 byte</strong> (<code>0x05DC</code>).",
        "Tutti i valori assegnati da IANA/IEEE per identificare i protocolli di livello superiore (<strong>EtherType</strong>) sono stati scelti rigorosamente <strong>maggiori o uguali a 1536</strong> (<code>0x0600</code>): ad esempio <code>0x0800</code> per IPv4, <code>0x86DD</code> per IPv6, <code>0x0806</code> per ARP.",
        "Una scheda di rete può quindi distinguere istantaneamente il formato esaminando quel singolo campo a 16 bit."
      ],
      "wrongReasons": "Non esiste bit di parità nell'header ({{opt:b}}); non dipende dal voltaggio ({{opt:c}}); non usa messaggi ICMP preventivi ({{opt:d}})."
    },
    {
      "id": 246,
      "custom": true,
      "difficulty": "difficile",
      "title": "Gigabit Ethernet: Carrier Extension e Packet Bursting",
      "topic": "collegamento",
      "question": "Nello standard Gigabit Ethernet a 1 Gbit/s in modalità half-duplex CSMA/CD, per quale motivo è stato introdotto il meccanismo di Carrier Extension e Packet Bursting?",
      "options": [
        {
          "origKey": "a",
          "text": "Perché alla velocità di 1 Gbit/s, una trama minima di 64 byte avrebbe una durata di soli 512 ns, limitando la dimensione massima del cavo a pochi metri; la Carrier Extension estende lo slot time a 512 byte aggiungendo simboli di padding sul canale."
        },
        {
          "origKey": "b",
          "text": "Per consentire l'utilizzo di indirizzi IPv6 a 128 bit sui router di vecchia generazione."
        },
        {
          "origKey": "c",
          "text": "Per impedire il surriscaldamento dei connettori RJ45."
        },
        {
          "origKey": "d",
          "text": "Per raddoppiare la frequenza di campionamento audio nei telefoni VoIP."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3z & Appunti TLC - Cap. 03 Sez. 7.3",
      "explanation": [
        "La condizione $T_{tx} \\ge 2 T_p$ impone che per mantenere un raggio di rete a $100\\unit{m}$, a $1\\unit{Gbit/s}$ lo slot time deve essere almeno pari a $512\\unit{byte}$ ($4096\\unit{bit}$), invece dei $64\\unit{byte}$ di 10/100 Mbps.",
        "<strong>Carrier Extension:</strong> se la trama è inferiore a 512 byte, il trasmettitore appende simboli di estensione (*carrier extension*) sul mezzo fisico fino a raggiungere 512 byte, garantendo la collision detection.",
        "<strong>Packet Bursting:</strong> per evitare che l'invio continuo di trame da 64 byte con padding sprechi banda, una stazione che ha più pacchetti può inviarli in raffica (*burst*) consecutiva senza rilasciare il canale, pagando la carrier extension solo sul primo frame."
      ],
      "wrongReasons": "Non riguarda IPv6 ({{opt:b}}); non riguarda il calore fisico ({{opt:c}}); non riguarda il VoIP ({{opt:d}})."
    },
    {
      "id": 247,
      "custom": true,
      "difficulty": "difficile",
      "title": "Throughput di CSMA al Variare del Parametro a = T_p / T_tx",
      "topic": "collegamento",
      "question": "Nel protocollo CSMA, l'efficienza massima di canale dipende fortemente dal parametro normalizzato a = T_p / T_tx (rapporto tra tempo di propagazione e tempo di trasmissione). Cosa accade alle prestazioni quando il parametro a cresce (a >> 1)?",
      "options": [
        {
          "origKey": "a",
          "text": "Il throughput crolla drasticamente degradandosi verso le prestazioni di ALOHA Puro, poiché le stazioni impiegano troppo tempo a percepire che un'altra stazione ha già iniziato a trasmettere, rendendo il carrier sensing inefficace."
        },
        {
          "origKey": "b",
          "text": "Il throughput sale al 100% poiché le collisioni non possono più verificarsi."
        },
        {
          "origKey": "c",
          "text": "Il parametro a non ha alcuna influenza sulle prestazioni di CSMA."
        },
        {
          "origKey": "d",
          "text": "La rete converte automaticamente il protocollo in TDMA a frequenza variabile."
        }
      ],
      "correctKey": "a",
      "refs": "Kleinrock & Tobagi 1975 & Appunti TLC - Cap. 03",
      "explanation": [
        "Il punto di forza di CSMA risiede nella capacità di 'ascoltare prima di parlare' (<em>Carrier Sense</em>).",
        "Tuttavia, quando una stazione inizia a trasmettere, il segnale impiega un tempo $T_p$ per raggiungere le altre stazioni. Durante questo intervallo, le altre stazioni sentono il canale libero anche se è già occupato.",
        "Se $a = T_p / T_{tx}$ è molto piccolo ($a \\to 0$, rete spazialmente compatta e pacchetti lunghi), il carrier sensing è quasi istantaneo ed efficace (efficienza $> 80-90\\%$).",
        "Se invece $a$ cresce ($a \\ge 1$, link lunghi o velocità altissime con pacchetti corti), l'ascolto della portante arriva troppo tardi e l'efficienza precipita a valori paragonabili ad ALOHA."
      ],
      "wrongReasons": "Non sale al 100% ({{opt:b}}); l'influenza è determinante ({{opt:c}}); non converte in TDMA ({{opt:d}})."
    },
    {
      "id": 248,
      "custom": true,
      "difficulty": "medio",
      "title": "Frame Check Sequence (FCS) e Magic Residue del CRC-32",
      "topic": "collegamento",
      "question": "Nel controllo di errore Ethernet (CRC-32), in che modo il ricevitore convalida l'integrità della trama ricevuta?",
      "options": [
        {
          "origKey": "a",
          "text": "Divide l'intero blocco ricevuto (dati + campo FCS a 32 bit) per il polinomio generatore standard G(x): se non ci sono stati errori di trasmissione, il resto della divisione binaria in GF(2) è rigorosamente nullo (o corrisponde a una costante nota detta magic residue)."
        },
        {
          "origKey": "b",
          "text": "Calcola la media aritmetica dei valori decimali dei byte e verifica se è divisibile per 8."
        },
        {
          "origKey": "c",
          "text": "Invia una richiesta ARP al trasmettitore per farsi reinviare il CRC originale."
        },
        {
          "origKey": "d",
          "text": "Verifica se l'indirizzo IP del mittente è presente nella tabella di routing."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3 & Appunti TLC - Cap. 03 Sez. 5.3",
      "explanation": [
        "Il trasmettitore calcola il resto $R(x)$ della divisione $M(x) \\cdot x^{32} / G(x)$ e lo appende come campo <strong>FCS (32 bit)</strong> in coda alla trama.",
        "Il ricevitore divide la sequenza completa ricevuta per lo stesso polinomio $G(x)$. Per le proprietà dell'aritmetica in $GF(2)$, se nessun bit è stato corrotto, il dividendo è un multiplo esatto di $G(x)$ e il <strong>resto deve risultare zero</strong> (o il valore costante complementato *magic residue* <code>0xC704DD7B</code>).",
        "Se il resto è diverso dal valore atteso, la trama viene scartata immediatamente."
      ],
      "wrongReasons": "Non usa la media aritmetica ({{opt:b}}); non fa richieste ARP ({{opt:c}}); non riguarda tabelle di routing ({{opt:d}})."
    },
    {
      "id": 249,
      "custom": true,
      "difficulty": "medio",
      "title": "Autonegoziazione Ethernet (IEEE 802.3u / 802.3ab)",
      "topic": "collegamento",
      "question": "Cosa consente la procedura di Autonegoziazione (Auto-Negotiation) quando due schede Ethernet vengono collegate tramite cavo twisted-pair?",
      "options": [
        {
          "origKey": "a",
          "text": "I due apparati scambiano impulsi Fast Link Pulse (FLP) per concordare automaticamente la massima velocità comune (10, 100 o 1000 Mbit/s) e la modalità duplex più favorevole (Full-Duplex rispetto ad Half-Duplex)."
        },
        {
          "origKey": "b",
          "text": "Determina quale dei due host debba fungere da server DHCP per l'intera LAN."
        },
        {
          "origKey": "c",
          "text": "Assegna le credenziali di accesso Wi-Fi WPA3 alle schede cablate."
        },
        {
          "origKey": "d",
          "text": "Misura la lunghezza del cavo per fatturare la bolletta telefonica."
        }
      ],
      "correctKey": "a",
      "refs": "IEEE 802.3 & Appunti TLC - Cap. 03",
      "explanation": [
        "L'<strong>autonegoziazione</strong> è un protocollo di livello fisico che opera prima dell'attivazione del link dati.",
        "Ciascun dispositivo trasmette una raffica di impulsi <em>Fast Link Pulse (FLP)</em> codificanti una parola di tecnologia a 16 bit contenente le proprie capacità operative.",
        "Entrambi gli endpoint selezionano la massima priorità comune: 1000BASE-T Full-Duplex > 1000BASE-T Half-Duplex > 100BASE-TX Full-Duplex > 100BASE-TX Half-Duplex > 10BASE-T."
      ],
      "wrongReasons": "Non elegge server DHCP ({{opt:b}}); non riguarda Wi-Fi o password ({{opt:c}}); non riguarda bollette telefoniche ({{opt:d}})."
    },
    {
      "id": 250,
      "custom": true,
      "difficulty": "difficile",
      "title": "FSM di TCP: Chiusura Simultanea (Simultaneous Close)",
      "topic": "trasporto_app",
      "question": "Cosa accade nella Macchina a Stati Finiti (FSM) di TCP se entrambi gli host A e B decidono di chiudere la connessione inviando contemporaneamente un segmento FIN prima di ricevere quello dell'altro (chiusura simultanea)?",
      "options": [
        {
          "origKey": "a",
          "text": "Entrambi passano da ESTABLISHED a FIN_WAIT_1; alla ricezione del rispettivo FIN transitano nello stato CLOSING; dopo aver riscontrato l'ultimo ACK transitano in TIME_WAIT per 2 MSL prima della chiusura definitiva (CLOSED)."
        },
        {
          "origKey": "b",
          "text": "La connessione entra in deadlock irreversibile e il computer deve essere riavviato."
        },
        {
          "origKey": "c",
          "text": "I segmenti FIN vengono entrambi annullati e la connessione rimane aperta per sempre."
        },
        {
          "origKey": "d",
          "text": "Uno dei due host viene eletto master tramite estrazione casuale e impone la riapertura."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 9293 & Appunti TLC - Cap. 04 Sez. 10 (FSM di TCP)",
      "explanation": [
        "Nella chiusura ordinaria asimmetrica, un nodo va in <code>FIN_WAIT_1 -> FIN_WAIT_2 -> TIME_WAIT</code> e l'altro in <code>CLOSE_WAIT -> LAST_ACK -> CLOSED</code>.",
        "Nella <strong>chiusura simultanea</strong>: entrambi inviano <code>FIN</code> passando a <code>FIN_WAIT_1</code>.",
        "Ciascuno riceve il <code>FIN</code> del peer (invece dell'ACK atteso) e transita nello stato intermedio <strong><code>CLOSING</code></strong>, inviando il relativo ACK.",
        "Alla ricezione dell'ACK dell'altro host, entrambi transitano nello stato <strong><code>TIME_WAIT</code></strong> dove rimangono per $2\\text{MSL}$ prima di deallocare i socket."
      ],
      "wrongReasons": "La FSM di TCP è progettata formalmente per gestire la chiusura simultanea senza deadlock ({{opt:b}}); non annulla i FIN ({{opt:c}}); non esiste elezione di master in TCP ({{opt:d}})."
    },
    {
      "id": 251,
      "custom": true,
      "difficulty": "difficile",
      "title": "Opzione TCP Window Scale (RFC 7323)",
      "topic": "trasporto_app",
      "question": "Il campo Window Size nell'header standard di TCP è limitato a 16 bit (valore massimo 65535 byte). Per quale motivo è stata introdotta l'opzione Window Scale (RFC 7323) e come funziona?",
      "options": [
        {
          "origKey": "a",
          "text": "Per consentire a TCP di saturare collegamenti ad altissimo prodotto banda-ritardo (BDP > 64 kB): definisce durante il 3-way handshake un fattore di scorrimento esponenziale (shift) fino a 14 bit, moltiplicando il valore annunciato fino a un massimo di circa 1 Gbyte."
        },
        {
          "origKey": "b",
          "text": "Per ridurre le dimensioni dell'header TCP da 20 byte a 8 byte."
        },
        {
          "origKey": "c",
          "text": "Per cifrare la finestra di trasmissione contro attacchi man-in-the-middle."
        },
        {
          "origKey": "d",
          "text": "Per forzare il ricevitore ad accettare solo pacchetti di dimensione inferiore a 100 byte."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 7323 & Appunti TLC - Cap. 04",
      "explanation": [
        "Su una linea a $10\\unit{Gbit/s}$ con $RTT = 50\\unit{ms}$, il BDP vale oltre $62.5\\unit{MB}$.",
        "Con la finestra limitata a 16 bit ($65\\,535\\unit{byte}$), TCP non potrebbe mai superare un throughput di $65535 \\times 8 / 0.05 \\approx 10.4\\unit{Mbit/s}$ (meno dello $0.1\\%$ del link!).",
        "L'opzione <strong>Window Scale</strong> negozia nei pacchetti <code>SYN</code> un fattore di scala $S \\in [0, 14]$. Il valore reale della finestra diventa $W = \\text{WindowSize} \\times 2^S$, estendendo la finestra massima a $65535 \\times 2^{14} \\approx 1.07\\unit{GB}$."
      ],
      "wrongReasons": "Le opzioni estendono l'header, non lo riducono ({{opt:b}}); non ha scopi crittografici ({{opt:c}}); serve per finestre grandi, non piccole ({{opt:d}})."
    },
    {
      "id": 252,
      "custom": true,
      "difficulty": "difficile",
      "title": "Opzione TCP Selective Acknowledgment (SACK - RFC 2018)",
      "topic": "trasporto_app",
      "question": "Quale vantaggio critico offre l'opzione TCP SACK (Selective Acknowledgment) rispetto al tradizionale riscontro cumulativo standard?",
      "options": [
        {
          "origKey": "a",
          "text": "Permette al ricevitore di specificare nell'header TCP fino a 4 intervalli contigui di byte ricevuti correttamente fuori sequenza, consentendo al mittente di ritrasmettere unicamente i segmenti mancanti senza dover ritrasmettere l'intera finestra come in Go-Back-N."
        },
        {
          "origKey": "b",
          "text": "Sostituisce il protocollo IP con il protocollo ATM."
        },
        {
          "origKey": "c",
          "text": "Elimina l'algoritmo di Slow Start portando la finestra istantaneamente a 1000 pacchetti."
        },
        {
          "origKey": "d",
          "text": "Garantisce la consegna dei pacchetti anche se il cavo fisico viene tranciato."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 2018 & Appunti TLC - Cap. 04",
      "explanation": [
        "Con l'ACK cumulativo standard, se vanno persi i pacchetti 2 e 5 su una raffica di 10 pacchetti, il mittente sa solo che il pacchetto 2 manca. Se ritrasmette il 2, non sa se 3, 4, 6..10 sono arrivati, rischiando di dover ritrasmettere tutto (comportamento Go-Back-N).",
        "Con <strong>SACK (RFC 2018)</strong>, l'ACK cumulativo rimane al byte 2, ma l'header TCP contiene blocchi SACK: <code>[3..4]</code> e <code>[6..10]</code>.",
        "Il mittente identifica con certezza chirurgica che mancano solo i pacchetti 2 e 5 e ritrasmette unicamente quelli, risparmiando banda e abbattendo i tempi di ripristino."
      ],
      "wrongReasons": "Non riguarda ATM ({{opt:b}}); non elimina lo Slow Start ({{opt:c}}); non supera i guasti fisici permanenti ({{opt:d}})."
    },
    {
      "id": 253,
      "custom": true,
      "difficulty": "difficile",
      "title": "Controllo di Congestione: Confronto tra TCP Tahoe, Reno e NewReno",
      "topic": "trasporto_app",
      "question": "Come differisce la risposta alla ricezione di 3 ACK duplicati (Fast Retransmit) tra TCP Tahoe e TCP Reno?",
      "options": [
        {
          "origKey": "a",
          "text": "TCP Tahoe imposta ssthresh = CWND / 2, fa crollare CWND = 1 MSS e ricomincia da Slow Start; TCP Reno imposta ssthresh = CWND / 2, ritrasmette il segmento perso e applica Fast Recovery impostando CWND = ssthresh + 3 MSS, evitando il crollo dello Slow Start."
        },
        {
          "origKey": "b",
          "text": "TCP Tahoe aumenta la finestra a infinito, TCP Reno chiude la connessione."
        },
        {
          "origKey": "c",
          "text": "Entrambi reagiscono azzerando la finestra a 0 e attendendo 60 secondi."
        },
        {
          "origKey": "d",
          "text": "TCP Reno non supporta la ricezione di ACK duplicati."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 5681 (TCP Congestion Control) & Appunti TLC - Cap. 04 Sez. 13",
      "explanation": [
        "<strong>TCP Tahoe:</strong> sia su timeout sia su 3 ACK duplicati, azzera <code>CWND = 1 MSS</code> e riparte in Slow Start fino a <code>ssthresh</code>.",
        "<strong>TCP Reno:</strong> distingue tra perdita grave da timeout (in cui azzera a 1 MSS) e perdita isolata da 3 ACK duplicati (che indica che i pacchetti successivi continuano a fluire verso il ricevitore generando gli ACK duplicati).",
        "Su 3 ACK duplicati, Reno applica <strong>Fast Recovery</strong>: dimezza <code>ssthresh = CWND / 2</code>, pone <code>CWND = ssthresh + 3 MSS</code> e prosegue in <strong>Congestion Avoidance (AIMD)</strong> senza ripassare dallo Slow Start, massimizzando il throughput."
      ],
      "wrongReasons": "Tahoe crolla a 1 MSS, Reno dimezza a ssthresh ({{opt:b}}, {{opt:c}}); Reno è nato proprio per gestire i 3 ACK duplicati con Fast Recovery ({{opt:d}})."
    },
    {
      "id": 254,
      "custom": true,
      "difficulty": "medio",
      "title": "Meccanismo di Delayed ACK in TCP (RFC 1122)",
      "topic": "trasporto_app",
      "question": "In cosa consiste l'algoritmo di Delayed ACK implementato nei ricevitori TCP secondo la RFC 1122?",
      "options": [
        {
          "origKey": "a",
          "text": "Il ricevitore non invia immediatamente un ACK per ogni singolo segmento ricevuto, ma attende fino a un massimo di 200-500 ms per accorpare il riscontro con dati applicativi di ritorno (piggybacking) o riscontrare due segmenti consecutivi con un unico ACK cumulativo."
        },
        {
          "origKey": "b",
          "text": "Il ricevitore posticipa gli ACK di 24 ore per ridurre il consumo della batteria."
        },
        {
          "origKey": "c",
          "text": "Gli ACK vengono inviati solo dopo che l'utente ha cliccato un pulsante sul browser."
        },
        {
          "origKey": "d",
          "text": "Il ricevitore scarta tutti gli ACK arrivati in ritardo."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 1122 & Appunti TLC - Cap. 04",
      "explanation": [
        "L'algoritmo di <strong>Delayed ACK</strong> è progettato per dimezzare il numero di segmenti ACK puri scambiati nella rete:",
        "Quando riceve un segmento valido e in ordine, il ricevitore TCP ritarda l'invio dell'ACK (per un massimo di $200-500\\unit{ms}$).",
        "Se durante questa attesa arriva un secondo segmento valido, il ricevitore invia immediatamente un unico ACK cumulativo per entrambi.",
        "Se l'applicazione locale invia dati in risposta, l'ACK viene allegato nell'header del segmento dati (*piggybacking*)."
      ],
      "wrongReasons": "Ritardi di 24 ore provocherebbero continui timeout sul mittente ({{opt:b}}); è un meccanismo del kernel di trasporto trasparente all'utente ({{opt:c}}); l'ACK viene generato dal ricevitore ({{opt:d}})."
    },
    {
      "id": 255,
      "custom": true,
      "difficulty": "medio",
      "title": "Tassonomia delle Porte TCP e UDP (IANA)",
      "topic": "trasporto_app",
      "question": "Come sono suddivisi i numeri di porta a 16 bit (da 0 a 65535) secondo la classificazione ufficiale dello standard IANA?",
      "options": [
        {
          "origKey": "a",
          "text": "0–1023: Porte Well-Known (servizi di sistema standard come HTTP 80, HTTPS 443, DNS 53); 1024–49151: Porte Registrate (assegnate a specifiche applicazioni); 49152–65535: Porte Dinamiche o Effimere (assegnate temporaneamente dal SO ai client per connessioni in uscita)."
        },
        {
          "origKey": "b",
          "text": "0–100: Porte per Windows; 101–200: Porte per Linux; 201–65535: Porte per macOS."
        },
        {
          "origKey": "c",
          "text": "Tutte le porte da 0 a 65535 sono assegnate casualmente ad ogni avvio del server."
        },
        {
          "origKey": "d",
          "text": "Le porte pari sono riservate a TCP, quelle dispari a UDP."
        }
      ],
      "correctKey": "a",
      "refs": "IANA Service Name and Port Number Registry & Appunti TLC - Cap. 04",
      "explanation": [
        "I 16 bit dei campi porta sorgente/destinazione consentono $2^{16} = 65536$ porte:",
        "<strong>Well-Known (0–1023):</strong> riservate ai protocolli storici e fondamentali (SSH 22, Telnet 23, SMTP 25, DNS 53, HTTP 80, HTTPS 443); nei sistemi Unix richiedono permessi di amministratore (*root*).",
        "<strong>Registered (1024–49151):</strong> registrate presso IANA da sviluppatori e vendor per servizi specifici (es. MySQL 3306, PostgreSQL 5432).",
        "<strong>Dynamic/Private/Ephemeral (49152–65535):</strong> allocate dinamicamente dallo stack IP del client per le connessioni uscenti."
      ],
      "wrongReasons": "Non dipendono dal sistema operativo ({{opt:b}}); non sono tutte casuali ({{opt:c}}); i numeri di porta TCP e UDP sono spazi indipendenti ({{opt:d}})."
    },
    {
      "id": 256,
      "custom": true,
      "difficulty": "difficile",
      "title": "Il Flag TCP RST (Reset)",
      "topic": "trasporto_app",
      "question": "In quali circostanze uno stack TCP genera un segmento con il flag RST (Reset) impostato a 1?",
      "options": [
        {
          "origKey": "a",
          "text": "Quando riceve un segmento destinato a una porta su cui non vi è alcun processo in ascolto (porta chiusa), oppure quando si desidera abortire immediatamente una connessione in stato anomalo scartando i dati nei buffer senza eseguire il 4-way handshake."
        },
        {
          "origKey": "b",
          "text": "Solo quando il computer viene spento correttamente dal menu di avvio."
        },
        {
          "origKey": "c",
          "text": "Durante la normale fase di avvio del 3-way handshake."
        },
        {
          "origKey": "d",
          "text": "Quando tutti i pacchetti sono stati riscontrati con successo."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 9293 & Appunti TLC - Cap. 04",
      "explanation": [
        "Il flag <strong>RST (Reset)</strong> indica che la connessione deve essere terminata istantaneamente senza attendere riscontri né drenare i buffer.",
        "Casi tipici di emissione di un <code>RST</code>:",
        "1. Un host riceve un segmento <code>SYN</code> o dati indirizzati a una porta TCP dove nessun server ha invocato <code>listen()</code> (equivalente al messaggio ICMP *Port Unreachable* di UDP).",
        "2. Un'applicazione invoca la chiusura con opzione <code>SO_LINGER</code> impostata a timeout zero per liberare subito le risorse.",
        "3. Rilevamento di numeri di sequenza o stati totalmente incoerenti che violano la FSM di TCP."
      ],
      "wrongReasons": "Lo spegnimento pulito invia FIN ({{opt:b}}); l'handshake usa SYN e ACK ({{opt:c}}); il successo usa ACK ({{opt:d}})."
    },
    {
      "id": 257,
      "custom": true,
      "difficulty": "medio",
      "title": "Attacco SYN Flood e Meccanismo dei SYN Cookies",
      "topic": "trasporto_app",
      "question": "In che modo l'adozione dei SYN Cookies protegge un server TCP dagli attacchi di tipo SYN Flood (Denial of Service)?",
      "options": [
        {
          "origKey": "a",
          "text": "Il server non alloca alcuna risorsa di memoria (Transmission Control Block) nella tabella delle connessioni semi-aperte alla ricezione del SYN: calcola l'Initial Sequence Number (ISN) come hash crittografico dei parametri del flusso e alloca la connessione solo quando riceve l'ACK finale contenente il cookie validato."
        },
        {
          "origKey": "b",
          "text": "Invia un cookie HTTP al browser dell'attaccante per tracciarne l'indirizzo di casa."
        },
        {
          "origKey": "c",
          "text": "Chiude tutte le porte del firewall a partire dalla porta 80."
        },
        {
          "origKey": "d",
          "text": "Raddoppia la memoria RAM fisica del server ad ogni richiesta ricevuta."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 4987 & Appunti TLC - Cap. 04",
      "explanation": [
        "In un attacco <strong>SYN Flood</strong>, l'attaccante invia valanghe di pacchetti <code>SYN</code> con indirizzi IP sorgente contraffatti (*spoofed*); il server alloca memoria nella coda delle connessioni semi-aperte (*SYN backlog*) e attende l'ACK, esaurendo in pochi secondi la memoria disponibile.",
        "Con i <strong>SYN Cookies</strong>, il server non salva nulla in memoria alla ricezione del <code>SYN</code>. Calcola invece il proprio sequence number iniziale <code>ISN</code> tramite un hash crittografico di (IP sorg, IP dest, porte, MSS e secret key).",
        "Quando (e solo se) arriva l'<code>ACK</code> finale del client, il server verifica che <code>ack_num - 1</code> coincida con l'hash crittografico: solo in quel momento alloca la memoria della connessione, sventando l'attacco DoS."
      ],
      "wrongReasons": "Non riguarda cookie HTTP ({{opt:b}}); non chiude le porte ({{opt:c}}); la RAM fisica non cresce magicamente ({{opt:d}})."
    },
    {
      "id": 258,
      "custom": true,
      "difficulty": "medio",
      "title": "Web Caching e Validazione Condizionale (HTTP Conditional GET)",
      "topic": "trasporto_app",
      "question": "Nel protocollo HTTP, come opera una richiesta condizionale (Conditional GET) per verificare se una risorsa presente nella cache locale del client o del proxy è ancora valida?",
      "options": [
        {
          "origKey": "a",
          "text": "Il client invia una richiesta GET allegando l'header If-Modified-Since o If-None-Match (ETag): se la risorsa non è cambiata, il server risponde con status 304 Not Modified con corpo del messaggio vuoto, evitando il re-invio dei dati."
        },
        {
          "origKey": "b",
          "text": "Il client cancella la cache e riscarica l'intero sito web ad ogni click."
        },
        {
          "origKey": "c",
          "text": "Il server invia una scansione antivirus dei dati memorizzati nel browser."
        },
        {
          "origKey": "d",
          "text": "La richiesta condizionale usa solo il metodo POST su porta 443."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 9110 (HTTP Semantics) & Appunti TLC - Cap. 05 Sez. 3",
      "explanation": [
        "La validazione condizionale evita di scaricare nuovamente risorse già presenti in cache.",
        "Il client memorizza il tag di versione dell'oggetto (<strong>ETag</strong>) o la data dell'ultimo aggiornamento (<strong>Last-Modified</strong>).",
        "Nella richiesta successiva, inserisce <code>If-None-Match: \"xyz\"</code> o <code>If-Modified-Since: ...</code>.",
        "Se la risorsa sul server è identica, il server risponde con <strong><code>304 Not Modified</code></strong> privo di body: il client usa la copia in cache, azzerando il consumo di banda."
      ],
      "wrongReasons": "La cache serve proprio a evitare di riscaricare tutto ({{opt:b}}); non fa scansioni antivirus ({{opt:c}}); è un metodo GET standard ({{opt:d}})."
    },
    {
      "id": 259,
      "custom": true,
      "difficulty": "difficile",
      "title": "HTTP/1.1 Chunked Transfer Encoding",
      "topic": "trasporto_app",
      "question": "Nel protocollo HTTP/1.1, quando e perché viene utilizzato l'header Transfer-Encoding: chunked?",
      "options": [
        {
          "origKey": "a",
          "text": "Quando la dimensione complessiva del corpo della risposta non è nota a priori al momento dell'inizio della trasmissione (es. contenuti generati dinamicamente o streaming), consentendo di inviare i dati suddivisi in blocchi (chunk) ciascuno preceduto dalla propria lunghezza in esadecimale e terminati da un chunk di dimensione zero."
        },
        {
          "origKey": "b",
          "text": "Per cifrare le transazioni bancarie con chiave RSA a 4096 bit."
        },
        {
          "origKey": "c",
          "text": "Solo quando il client è connesso tramite modem dial-up a 56 kbit/s."
        },
        {
          "origKey": "d",
          "text": "Per indicare che il server rifiuta la connessione a causa di un errore 500."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 9112 & Appunti TLC - Cap. 05",
      "explanation": [
        "Nelle connessioni persistenti HTTP/1.1, il client deve sapere dove finisce il corpo della risposta corrente per leggere la successiva.",
        "Normalmente si usa <code>Content-Length: N</code>. Tuttavia, per pagine generate dinamicamente da script o flussi video in tempo reale, il server non conosce in anticipo la dimensione finale $N$.",
        "Con <strong><code>Transfer-Encoding: chunked</code></strong>, il server invia i dati a pezzi: ogni pezzo è preceduto da una riga con la lunghezza in esadecimale (es. <code>1A3\\r\\n</code>), seguita dai dati. La trasmissione si conclude con un chunk vuoto: <code>0\\r\\n\\r\\n</code>."
      ],
      "wrongReasons": "Non riguarda la crittografia ({{opt:b}}); non è per modem 56k ({{opt:c}}); non indica rifiuto della connessione ({{opt:d}})."
    },
    {
      "id": 260,
      "custom": true,
      "difficulty": "medio",
      "title": "Tassonomia dei Codici di Stato HTTP (Status Codes)",
      "topic": "trasporto_app",
      "question": "Nel protocollo HTTP, qual è il significato delle 5 classi di codici di stato identificate dalla prima cifra numerica (1xx, 2xx, 3xx, 4xx, 5xx)?",
      "options": [
        {
          "origKey": "a",
          "text": "1xx: Informativo; 2xx: Successo dell'operazione; 3xx: Reindirizzamento (Redirection); 4xx: Errore imputabile al client (es. risorsa non trovata o non autorizzata); 5xx: Errore del server."
        },
        {
          "origKey": "b",
          "text": "1xx: Errore gravissimo; 2xx: Cavo staccato; 3xx: Password errata; 4xx: Pagina valida; 5xx: Download completato."
        },
        {
          "origKey": "c",
          "text": "La prima cifra indica il numero di hop IP percorsi dal pacchetto."
        },
        {
          "origKey": "d",
          "text": "I codici 4xx indicano sempre che il server è andato in crash hardware."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 9110 & Appunti TLC - Cap. 05",
      "explanation": [
        "Lo standard HTTP classifica formalmente i codici di stato a 3 cifre in base al primo carattere:",
        "<strong>1xx (Informational):</strong> richiesta ricevuta, prosecuzione (es. <code>101 Switching Protocols</code>).",
        "<strong>2xx (Successful):</strong> operazione completata con successo (es. <code>200 OK</code>, <code>204 No Content</code>).",
        "<strong>3xx (Redirection):</strong> sono necessarie ulteriori azioni per completare la richiesta (es. <code>301 Moved Permanently</code>, <code>304 Not Modified</code>).",
        "<strong>4xx (Client Error):</strong> la richiesta contiene errori sintattici o non può essere soddisfatta (es. <code>400 Bad Request</code>, <code>403 Forbidden</code>, <code>404 Not Found</code>).",
        "<strong>5xx (Server Error):</strong> il server ha fallito l'elaborazione di una richiesta valida (es. <code>500 Internal Server Error</code>, <code>502 Bad Gateway</code>, <code>503 Service Unavailable</code>)."
      ],
      "wrongReasons": "Le classificazioni ({{opt:b}}, {{opt:c}}, {{opt:d}}) sono prive di fondamento nello standard."
    },
    {
      "id": 261,
      "custom": true,
      "difficulty": "medio",
      "title": "DNS Caching e Ruolo del Campo TTL (Time-To-Live)",
      "topic": "trasporto_app",
      "question": "Nel Domain Name System (DNS), qual è il ruolo fondamentale del campo TTL (Time to Live) associato a ciascun Resource Record?",
      "options": [
        {
          "origKey": "a",
          "text": "Indica il tempo in secondi per cui il record può essere memorizzato e considerato valido nella cache locale dei resolver e dei server DNS ricorsivi prima di dover interrogare nuovamente il server autoritativo."
        },
        {
          "origKey": "b",
          "text": "Indica il numero massimo di router che il pacchetto DNS può attraversare prima di essere scartato."
        },
        {
          "origKey": "c",
          "text": "Indica la durata della sessione TCP aperta con il server web."
        },
        {
          "origKey": "d",
          "text": "Indica la data di scadenza del dominio registrato presso il registrar."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 1034, RFC 1035 & Appunti TLC - Cap. 05",
      "explanation": [
        "Il <strong>TTL dei Resource Record DNS</strong> è un intero a 32 bit espresso in <strong>secondi</strong>.",
        "Quando un server DNS locale interroga un server autoritativo e riceve un record (es. record A con <code>TTL = 3600</code>), memorizza l'associazione IP-Nome nella propria cache per 1 ora.",
        "Durante questo intervallo, qualsiasi altra richiesta per lo stesso dominio viene soddisfatta istantaneamente dalla cache locale senza generare traffico verso i server autoritativi o radice.",
        "<em>Attenzione:</em> da non confondere con il campo TTL dell'header IPv4, che rappresenta un conteggio di hop decrementato dai router."
      ],
      "wrongReasons": "Il conteggio di hop è il TTL dell'header IP, non del record DNS ({{opt:b}}); non riguarda connessioni TCP ({{opt:c}}); la scadenza del dominio è contrattuale/Whois, non il TTL ({{opt:d}})."
    },
    {
      "id": 262,
      "custom": true,
      "difficulty": "difficile",
      "title": "DNS su UDP vs DNS su TCP: Quando e Perché",
      "topic": "trasporto_app",
      "question": "Sebbene il DNS utilizzi prevalentemente il protocollo UDP sulla porta 53, in quali casi specifici interviene obbligatoriamente il protocollo TCP sulla stessa porta 53?",
      "options": [
        {
          "origKey": "a",
          "text": "Per le operazioni di Zone Transfer (AXFR) tra server DNS primari e secondari, e ogni volta che la risposta DNS supera i 512 byte (quando il server imposta il flag TC di troncamento indicando al client di riprovare su TCP)."
        },
        {
          "origKey": "b",
          "text": "Solo quando il client richiede l'indirizzo MAC di una stampante di rete."
        },
        {
          "origKey": "c",
          "text": "Solo quando l'host è collegato tramite cavo a fibre ottiche sottomarine."
        },
        {
          "origKey": "d",
          "text": "TCP viene usato solo per i domini che terminano con l'estensione .org."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 1035, RFC 5966 & Appunti TLC - Cap. 05",
      "explanation": [
        "Il DNS usa <strong>UDP/53</strong> per le normali query/risposte leggere (basso overhead e velocità a 1 RTT).",
        "Tuttavia, usa tassativamente <strong>TCP/53</strong> in due circostanze critiche:",
        "<strong>1. Zone Transfer (AXFR / IXFR):</strong> la replica dell'intero database di una zona tra server master e slave richiede affidabilità assoluta e trasferisce grandi volumi di record.",
        "<strong>2. Risposte troncate (> 512 byte):</strong> nelle specifiche originarie di UDP, le risposte DNS non potevano superare 512 byte. Se la risposta supera tale soglia, il server imposta il flag <code>TC = 1</code> (<em>Truncated</em>): il client scarta la risposta parziale e riapre una connessione su <strong>TCP</strong> per ricevere i dati completi."
      ],
      "wrongReasons": "Non c'entra con stampanti ({{opt:b}}); non dipende dal tipo di fibra ({{opt:c}}); non dipende dal TLD ({{opt:d}})."
    },
    {
      "id": 263,
      "custom": true,
      "difficulty": "medio",
      "title": "Protocolli di Posta Elettronica: SMTP vs POP3 vs IMAP",
      "topic": "trasporto_app",
      "question": "Qual è la distinzione funzionale corretta tra i protocolli applicativi di posta elettronica SMTP, POP3 e IMAP?",
      "options": [
        {
          "origKey": "a",
          "text": "SMTP è un protocollo di invio (push) usato per trasmettere email dal client al server e tra server; POP3 è un protocollo di accesso (pull) semplice che scarica le email in locale e le cancella dal server; IMAP è un protocollo di accesso avanzato che mantiene i messaggi e le cartelle sincronizzati sul server per accessi simultanei da più dispositivi."
        },
        {
          "origKey": "b",
          "text": "SMTP serve per scaricare la posta, POP3 per inviarla e IMAP per crittografarla."
        },
        {
          "origKey": "c",
          "text": "Tutti e tre i protocolli sono stati aboliti e sostituiti da ICMP per motivi di sicurezza."
        },
        {
          "origKey": "d",
          "text": "POP3 supporta lo streaming audio in tempo reale, SMTP no."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 5321 (SMTP), RFC 1939 (POP3), RFC 9051 (IMAP) & Appunti TLC - Cap. 05",
      "explanation": [
        "<strong>SMTP (Simple Mail Transfer Protocol):</strong> protocollo *push*; serve per inviare posta dal mittente al proprio server di posta (MTA) e per inoltrare i messaggi tra i server di posta su Internet fino al server del destinatario.",
        "<strong>POP3 (Post Office Protocol v3):</strong> protocollo *pull* minimalista; scarica i messaggi sulla macchina locale del client (*download-and-delete* o *download-and-keep*), senza sincronizzazione remota delle cartelle.",
        "<strong>IMAP (Internet Message Access Protocol):</strong> mantiene le email memorizzate permanentemente sul server organizzate in cartelle (*folders*); consente la visualizzazione, la marcatura di lettura e la sincronizzazione trasparente su smartphone, webmail e client desktop multipli."
      ],
      "wrongReasons": "Inverte invio e ricezione ({{opt:b}}); ICMP è un protocollo di rete per messaggi di controllo, non posta ({{opt:c}}); POP3 non fa streaming audio ({{opt:d}})."
    },
    {
      "id": 264,
      "custom": true,
      "difficulty": "medio",
      "title": "Estensioni MIME per la Posta Elettronica (RFC 2045-2049)",
      "topic": "trasporto_app",
      "question": "Poiché il protocollo SMTP originale è nato per trasferire solo testo ASCII a 7 bit con righe di lunghezza limitata, come consentono le estensioni MIME (Multipurpose Internet Mail Extensions) l'invio di allegati binari (immagini, PDF, audio)?",
      "options": [
        {
          "origKey": "a",
          "text": "Introducono appositi header (Content-Type, Content-Transfer-Encoding) e convertono i byte arbitrari dei file binari in sequenze di caratteri ASCII stampabili sicuri tramite algoritmi di codifica come Base64 o Quoted-Printable."
        },
        {
          "origKey": "b",
          "text": "Costringono il router di confine a stampare il file su carta."
        },
        {
          "origKey": "c",
          "text": "Sostituiscono l'indirizzo IP con l'indirizzo MAC del destinatario."
        },
        {
          "origKey": "d",
          "text": "Cancellano tutti i byte che non corrispondono a vocali italiane."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 2045, RFC 2046 & Appunti TLC - Cap. 05",
      "explanation": [
        "I server di posta storici scartavano o alteravano i byte con l'ottavo bit a 1 (non-ASCII).",
        "<strong>MIME (RFC 2045)</strong> risolve il problema senza modificare i server SMTP esistenti:",
        "1. Definisce il tipo di contenuto con l'header <code>Content-Type: image/jpeg; boundary=\"...\"</code>.",
        "2. Specifica la codifica con <code>Content-Transfer-Encoding: base64</code>: l'algoritmo **Base64** raggruppa i bit binari a blocchi di 6 bit e li mappa su 64 caratteri ASCII sicuri (A-Z, a-z, 0-9, +, /), permettendo a qualsiasi allegato binario di viaggiare indenne su SMTP."
      ],
      "wrongReasons": "Non stampa su carta ({{opt:b}}); non riguarda indirizzi IP/MAC ({{opt:c}}); non altera il contenuto escludendo consonanti ({{opt:d}})."
    },
    {
      "id": 265,
      "custom": true,
      "difficulty": "difficile",
      "title": "Modalità FTP Attiva (Active) vs Passiva (Passive) e Interazione con i Firewall",
      "topic": "trasporto_app",
      "question": "Nel protocollo FTP (File Transfer Protocol), qual è la differenza tra modalità Attiva e Passiva, e perché la modalità Passiva è indispensabile in presenza di NAT e firewall lato client?",
      "options": [
        {
          "origKey": "a",
          "text": "In modalità Attiva il server inizia la connessione dati collegandosi dalla porta 20 verso una porta del client (che viene bloccata dai firewall del client); in modalità Passiva (PASV) è sempre il client a prendere l'iniziativa aprendo entrambe le connessioni (controllo e dati) verso porte aperte dal server, attraversando senza problemi firewall e NAT."
        },
        {
          "origKey": "b",
          "text": "In modalità Attiva il server scarica file solo di notte, in Passiva solo di giorno."
        },
        {
          "origKey": "c",
          "text": "La modalità Passiva non richiede credenziali di autenticazione."
        },
        {
          "origKey": "d",
          "text": "In modalità Attiva si usa UDP, in modalità Passiva si usa TCP."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 959 & Appunti TLC - Cap. 05",
      "explanation": [
        "FTP usa due canali TCP distinti: **Controllo** (porta 21) e **Dati**.",
        "<strong>FTP Attivo:</strong> il client apre la connessione di controllo (porta 21) e comunica con il comando <code>PORT</code> una propria porta effimera $N$. Il server tenta poi di aprire una connessione dati <em>da fuori verso dentro</em> partendo dalla propria porta 20 verso la porta $N$ del client. I firewall e i router NAT del client bloccano questa connessione in ingresso non richiesta.",
        "<strong>FTP Passivo (PASV):</strong> il client invia il comando <code>PASV</code>. Il server apre una porta effimera casuale $P$ e ne comunica l'IP e la porta al client. È quindi il <strong>client</strong> a iniziare la connessione dati verso il server (*outbound connection*), consentita naturalmente da firewall e NAT."
      ],
      "wrongReasons": "Non riguarda l'orario ({{opt:b}}); entrambe richiedono autenticazione ({{opt:c}}); entrambe usano connessioni TCP ({{opt:d}})."
    },
    {
      "id": 266,
      "custom": true,
      "difficulty": "difficile",
      "title": "Messaggi ICMP Redirect e Destination Unreachable",
      "topic": "rete",
      "question": "Qual è il significato e la funzione specifica dei messaggi ICMP Redirect (Tipo 5) e ICMP Destination Unreachable (Tipo 3)?",
      "options": [
        {
          "origKey": "a",
          "text": "ICMP Redirect viene inviato da un router per notificare all'host sorgente che esiste un router alternativo più efficiente sulla stessa sottorete locale per raggiungere la destinazione; ICMP Destination Unreachable segnala che il datagramma non è recapitato (es. per rete non raggiungibile, host spento o porta UDP chiusa)."
        },
        {
          "origKey": "b",
          "text": "ICMP Redirect serve a crittografare i file temporanei del browser."
        },
        {
          "origKey": "c",
          "text": "ICMP Destination Unreachable viene inviato solo quando il cavo sottomarino è scollegato."
        },
        {
          "origKey": "d",
          "text": "Entrambi sono comandi proprietari di Microsoft Windows che non fanno parte dello standard IP."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 792 & Appunti TLC - Cap. 02 & Cap. 04",
      "explanation": [
        "<strong>ICMP (Internet Control Message Protocol, RFC 792):</strong>",
        "<strong>ICMP Redirect (Tipo 5):</strong> se un host invia un pacchetto al Default Gateway $R_1$, ma $R_1$ si rende conto che il percorso ottimale per raggiungere la destinazione prevede l'inoltro al router $R_2$ presente sulla <em>stessa sottorete locale dell'host</em>, inoltra il pacchetto a $R_2$ e invia un ICMP Redirect all'host affinché aggiorni la propria tabella locale per inviare i pacchetti futuri direttamente a $R_2$.",
        "<strong>ICMP Destination Unreachable (Tipo 3):</strong> notifica errori di consegna: Codice 0 (Rete irraggiungibile), Codice 1 (Host irraggiungibile), Codice 3 (Porta irraggiungibile, tipica di UDP su porta chiusa)."
      ],
      "wrongReasons": "Non crittografa file ({{opt:b}}); non riguarda solo cavi sottomarini ({{opt:c}}); sono standard IETF definiti nella RFC 792 ({{opt:d}})."
    },
    {
      "id": 267,
      "custom": true,
      "difficulty": "medio",
      "title": "Funzionamento dell'Utility Traceroute e TTL IP",
      "topic": "rete",
      "question": "Come riesce il comando traceroute a determinare la sequenza di tutti i router attraversati lungo il cammino verso una destinazione?",
      "options": [
        {
          "origKey": "a",
          "text": "Invia una serie di pacchetti (UDP o ICMP Echo) impostando il campo Time-To-Live (TTL) dell'header IP progressivamente a 1, 2, 3...: ogni router i-esimo decrementa il TTL a 0, scarta il pacchetto e restituisce alla sorgente un messaggio di errore ICMP Time Exceeded (Tipo 11), rivelando il proprio indirizzo IP."
        },
        {
          "origKey": "b",
          "text": "Interroga un satellite GPS che fotografa la rotta dei cavi in fibra ottica."
        },
        {
          "origKey": "c",
          "text": "Legge una tabella segreta salvata nel BIOS della scheda madre."
        },
        {
          "origKey": "d",
          "text": "Costringe tutti i router della Terra a riavviarsi in sequenza."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 792 & Appunti TLC - Cap. 01 Sez. 2 / Cap. 02",
      "explanation": [
        "Il meccanismo di <strong>traceroute</strong> è una delle applicazioni più eleganti dell'architettura IP:",
        "1. Invia un pacchetto con <code>TTL = 1</code>: il primo router decrementa il TTL a 0, scarta il pacchetto e invia indietro un messaggio <strong><code>ICMP Time Exceeded (Type 11, Code 0)</code></strong>; l'IP sorgente di questo messaggio identifica il 1° router.",
        "2. Invia con <code>TTL = 2</code>: supera il primo router ed è scartato dal secondo, che risponde con ICMP Time Exceeded, rivelando il 2° router.",
        "3. Il procedimento prosegue finché il pacchetto raggiunge la destinazione finale (che risponde con ICMP Echo Reply o ICMP Port Unreachable se su porta UDP casuale chiusa)."
      ],
      "wrongReasons": "Non usa satelliti GPS per i router IP ({{opt:b}}); non è una tabella nel BIOS ({{opt:c}}); non riavvia i router ({{opt:d}})."
    },
    {
      "id": 268,
      "custom": true,
      "difficulty": "medio",
      "title": "Il Ruolo del DHCP Relay Agent nelle Reti Complesse",
      "topic": "rete",
      "question": "Poiché i messaggi DHCPDISCOVER sono inviati in broadcast di Livello 2 e Livello 3 e i router non inoltrano il traffico broadcast tra sottoreti diverse, come fa un singolo server DHCP centralizzato a configurare host situati in sottoreti multiple?",
      "options": [
        {
          "origKey": "a",
          "text": "Tramite un DHCP Relay Agent configurato sul router di ciascuna sottorete locale, che intercetta i pacchetti broadcast DHCP dei client, li incapsula in normali pacchetti unicast instradabili e li inoltra direttamente all'indirizzo IP del server DHCP centrale."
        },
        {
          "origKey": "b",
          "text": "È obbligatorio installare un server DHCP hardware fisico separato per ogni singolo computer collegato."
        },
        {
          "origKey": "c",
          "text": "Configurando tutti gli host con lo stesso indirizzo MAC per condividere l'IP."
        },
        {
          "origKey": "d",
          "text": "I router inoltrano sempre tutti i pacchetti broadcast sull'intera rete mondiale di Internet."
        }
      ],
      "correctKey": "a",
      "refs": "RFC 2131 (DHCP) & Appunti TLC - Cap. 02",
      "explanation": [
        "Quando un host si connette, non ha un IP e invia un <code>DHCPDISCOVER</code> in broadcast limitato (<code>255.255.255.255</code>).",
        "I router bloccano tassativamente i pacchetti broadcast per non saturare la rete.",
        "Per evitare di dover posizionare un server DHCP in ogni singola LAN, il router locale agisce da <strong>DHCP Relay Agent (RFC 1542 / RFC 2131)</strong>: riceve il broadcast sulla porta UDP 67, inserisce l'indirizzo della sottorete locale nel campo <code>giaddr</code> del messaggio DHCP e lo invia in **unicast** attraverso la rete al server DHCP aziendale, che risponde con l'offerta appropriata."
      ],
      "wrongReasons": "Non serve un server fisico per ogni computer ({{opt:b}}); condividere il MAC causerebbe collisioni e conflitti gravissimi ({{opt:c}}); i router bloccano i broadcast, non li propagano su Internet ({{opt:d}})."
    }
  ]
};
