##### A configuração abaixo serve para deploy da aplicação em ambos os servidores, tanto de teste como de produção.
##### Para deploy no ambiente de teste é necessário também a configuração do MySQL, instruções no final do arquivo.

## Pacotes e ferramentas

Pacotes e ferramentas necessárias para deploy da aplicação e API.

| Plugin | README |
| ------ | ------ |
| .Net SDK | https://dotnet.microsoft.com/download/dotnet/3.1 ```{o número pode ser alterado de acordo com a versão do app}```|
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

### Publicar a api .Net Core

Utilize os comandos abaixo para dar build na sua API:

```sh
git clone ${url do repositório da sua aplicação}
cd ${pasta do repositório da sua aplicação}
dotnet publish -c Release
cd /bin/Release/netcoreapp3.1/publish/
ou
cd /bin/Release/net5.0/publish/ dependendo da versão do app
pm2 start “dotnet ${nome da sua aplicação}.dll --urls=http://*:${porta da sua aplicação}” –name ${nome da sua aplicação}
```

Caso a aplicação já esteja em produção, para publicar uma atualização basta dar build na aplicação novamente e reiniciar usando o pm2
```sh
cd ${pasta do repositório da sua aplicação}
git pull
pm2 stop ${nome da sua aplicação}
dotnet publish -c Release
pm2 reload ${nome da sua aplicação}
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

Em seguida procure a linha que contém  `server_name` e altere o endereço para um dominio que você tenha escolhido, para saber como adicionar um dominio ao Digital Ocean [clique aqui!](https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/). Em seguida adicione dois blocos de location logo abaixo, um para a API e um para a aplicação ReactJS, eles vão ser os subdomain. Substituia `root` para o endereço da pasta `build/` da sua aplicação ReactJS

```sh
. . .

server_name ${seu-domain};

location / {
        root /var/www/${nome-da-sua-aplicação};
        index index.html;
        try_files $uri $uri/ /index.html;
}

location /api/ {
        proxy_pass http://127.0.0.1:${porta da sua aplicação}/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Conecction keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
}

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

Em seguida vamos copiar os arquivos para a pasta que criamos na pasta `/var/www` do linux, e em seguida reiniciar o Nginx: 

```sh
cp -a build/* /var/www/bfreewebui/
systemctl reload nginx
```

###### Pronto, você ja deve ser capaz de acessar a sua aplicação ReactJS em seu navegador, basta digitar o endereço do dominio que você configurou.



# Para configurar o deploy em ambiente de teste é necessário instalar também o MySql
# Atenção, configurar o MySQL somente se o banco não estiver sendo utilizado como serviço (caso Eduzz)

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

Em seguida acesse o mysql e altere a senha do root, saia e então reinicie o serviço do MySql:

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
```

Em seguida você deve acessar o MySql Server remotamente o banco de dados no qual a api vai acessar, para isso siga o tutorial abaixo:

[Mysql Workbench acesso remoto com SSH](https://tecdicas.com/como-acessar-um-servidor-mysql-usando-um-tunel-ssh-no-windows/)




