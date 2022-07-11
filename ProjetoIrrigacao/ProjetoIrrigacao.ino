//Projeto Arduino - Tópicos Especiais 2022/1
//Monitora a planta e realiza a irrigação quando a umidade do solo está muito baixa
//sensor de umidade para o solo; sensor de umidade e temperatura do ar; 
//relé para ligar bomba de aquário para irrigar

#define pinoRele 4
#define pinoSensorSolo A0
//#define botao 2

//temperatura e umidade do ar
#include "DHT.h"
#define DHTPIN A1 // pino analogico
#define DHTTYPE DHT11 // DHT 11
DHT dht(DHTPIN, DHTTYPE);

//int valor_botao; //botão para rega manual
int valor_analogico; //valor sensor umidade
int rega = 0; //1 foi regada, 0 não foi
int umidadeAr;
int temperaturaAr;
//bool estado_botao = 0; //1 ligado, 0 desligado

void setup() {
  Serial.begin(115200);

  dht.begin();//temperatura e umidade do ar
  pinMode(pinoSensorSolo, INPUT); //solo
//  pinMode(botao, INPUT); //botao
  pinMode(pinoRele, OUTPUT); //rele
  digitalWrite(pinoRele, HIGH); //começa desligado
}

void loop() {
    valor_analogico = analogRead(pinoSensorSolo);
    lerDHT();
    
    int porcento = map(valor_analogico, 1023, 0, 0, 100); //umidade do solo em porcentagem
    
//    estado_botao = digitalRead(botao);
//    Serial.println(estado_botao);
 
//    Serial.print("Valor analógico umidade solo:");
//    Serial.println(valor_analogico);
  
    if(valor_analogico > 0 && valor_analogico <400){
//      Serial.println("Solo umido");
//    }else if(valor_analogico > 400 && valor_analogico <800){
////      Serial.println("Solo pouco umido");
    }else if(valor_analogico > 500 && valor_analogico <1020){ //rega
//      Serial.println("Solo seco");
      ligarBomba();
    }

//    if(estado_botao != estado_anterior){ 
//      Serial.println("Apertou botão.");
////      ligarBomba();
//      delay(2000); //tempo pra não 'apertar' varias vezes no botão com um click
//    }


    //envia os dados para serial onde o servidor está escutando 
    //umidadeSoloAnalog, umidadeSoloPorc, umidadeAr, temperaturaAr, rega
    Serial.print((String)valor_analogico+","+porcento+","+umidadeAr+","+temperaturaAr+","+rega);
//    Serial.println(" ");
    rega = 0; //volta a rega para false
//  estado_anterior = estado_botao;

    delay(20000);//20000 = 20s; 2 min = 120000; 300000 = 5 min tempo para próxima leitura
}

void ligarBomba(){
    digitalWrite(pinoRele, LOW); //liga bomba
    delay(6000); //tempo de bomba ligada em milissegundos = 6s
    digitalWrite(pinoRele, HIGH); //desliga bomba
    //Serial.println("Rega realizada!");
    rega = 1;
}

void lerDHT(){
  //sensor temperatura e umidade
  umidadeAr = dht.readHumidity();
  temperaturaAr = dht.readTemperature();
  
  //testa se retorno é valido, caso contrário algo está errado.
  if (isnan(temperaturaAr) || isnan(umidadeAr)){
    Serial.println("Failed to read from DHT");
  }else{
//    Serial.print("Umidade: ");
//    Serial.print(umidadeAr);
//    Serial.println(" %");
//    Serial.print("Temperatura: ");
//    Serial.print(temperaturaAr);
//    Serial.println(" *C");
  }

//  delay(6000);//tempo para a próxima leitura
}
