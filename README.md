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

Agora abra o arquivo mencionado abaixo e comente a linha que contém `bind-address=127.0.0.1` para liberar o acesso remoto ao Sql Server:

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

Em seguida você deve acessar o MySql Server remotamente o banco de dados no qual a api vai acessar, para isso siga o tutorial abaixo:

[Mysql Workbench acesso remoto com SSH](https://tecdicas.com/como-acessar-um-servidor-mysql-usando-um-tunel-ssh-no-windows/)

### Publicar a api .Net Core

Utilize os comandos abaixo para dar build na sua API:

```sh
git clone ${url do repositório da sua aplicação}
cd ${pasta do repositório da sua aplicação}
dotnet publish -c Release
cd /obj/Release/netcoreapp3.1/
pm2 start “dotnet ${nome da sua aplicação}.dll --urls=http://*:4803” –name ${nome da sua aplicação}
```

Em seguida verifique no PM2 se a sua aplicação esta rodando corretamenta:

```sh
pm2 list
```

Agora só testar em algum cliente de API utilizando o IP da sua máquina SSH e um endpoint definido por você na API.

### Instalar e configurar o Nginx

```sh
sudo apt-get update
sudo apt-get install nginx
```

Em seguida liberar o nginx no firewall:

```sh
sudo ufw allow 'Nginx Full'
```

Agora vamos configurar os arquivos do Nginx, abra o arquivo com um editor de texto de sua preferência:

```sh
sudo nano /etc/nginx/sites-available/default
```

Em seguida procure a linha que contém  `server_name` e altere o endereço para um dominio que você tenha escolhido, para saber como adicionar um dominio ao Digital Ocean [clique aqui!](https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/). Substitua `example.com` pelo seu dominio.

```sh
. . .

server_name example.com www.example.com;

. . .
```

Verifique se a configuração do Nginx está correta e em seguida reinicie o mesmo para aplicar as mudanças: 

```sh
sudo nginx -t
sudo systemctl reload nginx
```

Agora ao acessar o seu dominio pelo navegador, você deverá ver a tela de boas-vindas do Nginx.


### Publicar aplicação ReactJS

Clone seu repositório do Github na qual está armazenada a sua aplicação ReactJS na pasta `/~` do servidor. Em seguida rode os comandos abaixo para dar build na sua aplicação:

```sh
cd ${nome-da-sua-aplicação}
git pull origin master
npm install
npm run build
```

Em seguida vamos substituir os arquivos defaults do Nginx pelos da nossa aplicação que acabamos de buildar, e em seguida reiniciar o Nginx: 

```sh
cp -a build/* /var/www/html/
systemctl reload nginx
```

###### Pronto, você ja deve ser capaz de acessar a sua aplicação ReactJS em seu navegador, basta digitar o endereço do dominio que você configurou.


### Opcional

Caso seja de seu interesse configure as chaves SSH para acessar o servidor e realizar configurações clicando [nesse link](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/to-account/).
 
