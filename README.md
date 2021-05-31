## Pacotes e ferramentas

Pacotes e ferramentas necessárias para deploy da aplicação e API.

| Plugin | README |
| ------ | ------ |
| .Net SDK | https://dotnet.microsoft.com/download/dotnet/3.1|
| NodeJS | https://nodejs.org/en/download/|
| Nginx | http://nginx.org/en/download.html|
| PM2 | https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/|
| MySql Server | https://dev.mysql.com/downloads/installer/|

## Instalação dos pacotes essenciais para rodar a API e o Site no server.

Instale o NodeJS e em seguida verifique se o NPM foi instalado junto:

```sh
sudo apt-get install nodejs
npm -v
```

Caso o NPM não esteja instalado, instale-o em seguida:

```sh
sudo apt-get install npm
```

Use o NPM para instalar o PM2 em nivel global, vamos utilizar-lo para gerenciar nossa API:

```sh
npm install pm2 -g
```

### Instalando o .Net SDK e configurando acesso à API.

Baixe os arquivos dos repositórios da Microsoft necessários para instalar o .Net SDK:

```sh
wget -q packages-microsoft-prod.deb https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```

Em seguida baixe e instale o SDK e o Runtime do .Net:

```sh
sudo apt-get update
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-3.1
sudo apt-get install dotnet-runtime-3.1
sudo apt-get install aspnetcore-runtime-3.1
```

Instalação e configuração do MySql Server:

```sh
sudo apt-get install mysql-server -y
```

Caso não inicie a configuração inicial do MySql, rode o comando abaixo e selecione as seguintes opções:

```sh
sudo mysql_secure_installation
```

| Opção | Resposta |
| ------ | ------ |
| Would you like to setup VALIDATE PASSWORD component? | n |
| Please set the password for root here | _insira sua senha aqui_|
| Remove anonymous users? | y |
| PM2Disallow root login remotely | n |
| Remove test database and access to it? | y |
| Reload privilege table now? | y |

Em seguida acesse o mysql e altere a senha do root, saia e então reinicie o Sql Server:

```sh
mysql -u root
mysql> Alter user 'root'@'localhost' identified with caching_sha2_password by 'root'
mysql> exit
sudo systemctl restart mysql
```

Agora abra o arquivo mencionado abaixo e comente a linha que contem `bind-address=127.0.0.1` para liberar o acesso remoto ao Sql Server:

```sh
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

Ligar o firewall e configurar as portas necessárias:

```sh
ufw enable
sudo ufw allow ssh
sudo ufw allow 3306/tcp
sudo ufw allow 4803/tcp
```

Em seguida você deve acessar o Sql Server remotamente o banco de dados no qual a api vai acessar, para isso siga o tutorial abaixo:

[Mysql Workbench acesso remoto com SSH](https://tecdicas.com/como-acessar-um-servidor-mysql-usando-um-tunel-ssh-no-windows/)
