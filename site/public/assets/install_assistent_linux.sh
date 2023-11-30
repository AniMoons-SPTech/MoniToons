apt-get -y update 
apt-get -y upgrade 
PURPLE='0;35'
NC='\033[0m' 
VERSAO=11
	
echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Olá Aluno, serei seu assistente para instalação do Java!;"
sleep 2
echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Verificando aqui se você possui o Java instalado...;"
sleep 2

java -version
if [ $? -eq 0 ];then
	echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) : Olá você já tem o java instalado!!"
	sleep 2
else
	echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Opa! Não identifiquei nenhuma versão do Java instalado, mas sem problemas, irei resolver isso agora!"
	sleep 2
	echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Adicionando o repositório!"
	sleep 2
	add-apt-repository ppa:webupd8team/java -y
	clear
	echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Atualizando Pacotes! Quase lá."
	sleep 2
	apt update -y
	clear
	echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Preparando para instalar a versão 17 do Java. Confirme a instalação quando solicitado ;D"
	sleep 1
	apt install default-jre ; apt install openjdk-17-jre; -y
	clear
	echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Java instalado com sucesso!"
	sleep 1
fi
echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Olá Aluno, serei seu assistente para instalação do Python 3, pip e Docker!;"
sleep 2

# Verificar se o Python 3 está instalado
python3 --version
if [ $? -eq 0 ]; then
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) O Python 3 já está instalado!"
    sleep 2
else
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Opa! Não identifiquei o Python 3 instalado, mas sem problemas, irei resolver isso agora!"
    sleep 2

    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Instalando o Python 3..."
    apt update -y
    apt install python3 -y
    clear
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Python 3 instalado com sucesso!"
    sleep 1
fi

# Verificar se o pip está instalado
pip --version
if [ $? -eq 0 ]; then
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) O pip já está instalado!"
    sleep 2
else
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Opa! Não identifiquei o pip instalado, mas sem problemas, irei resolver isso agora!"
    sleep 2
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Instalando o pip..."
    apt install python3-pip -y
    clear
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) pip instalado com sucesso!"
    sleep 1
fi

# Verificar se o Docker está instalado
docker --version
if [ $? -eq 0 ]; then
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) O Docker já está instalado!"
    sleep 2
else
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Opa! Não identifiquei o Docker instalado, mas sem problemas, irei resolver isso agora!"
    sleep 2
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Adicionando o repositório do Docker!"
    apt update -y
    apt install docker.io -y
    clear
    echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Docker instalado com sucesso!"
    sleep 1
    
fi

pip install nvidia-nvml-dev-cu12

apt install unzip

docker run -d --name mysql-monitoons --restart always -e MYSQL_ROOT_PASSWORD=animoons -e MYSQL_DATABASE=monitoons -e MYSQL_USER=animoons -e MYSQL_PASSWORD=animoons -p 3306:3306 voltty/mysql-monitoons:0.0.5


git clone https://github.com/AniMoons-SPTech/Java-Monitoons.git

mv Java-Monitoons/JARS/Monitoons.zip .

unzip Monitoons.zip

rm -rf Java-Monitoons/

rm *zip

rm script.sh

init 6

