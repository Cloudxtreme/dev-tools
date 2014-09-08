## RabbitMQ commands on MAC

# Install using brew (http://brew.sh)
brew install rabbitmq

export RABBITMQ_HOME=/usr/local/Cellar/rabbitmq/3.3.4
# To run the server
$RABBITMQ_HOME/sbin/rabbitmq-server 

# To set server defaults
$RABBITMQ_HOME/sbin/rabbitmq-defaults 

# To view the list of queues
$RABBITMQ_HOME/sbin/rabbitmqctl list_queues

# To enable management plugin
$RABBITMQ_HOME/sbin/rabbitmq-plugins enable rabbitmq_management

# To add a user with administrator priviledges
$RABBITMQ_HOME/sbin/rabbitmqctl add_user admin admin
$RABBITMQ_HOME/sbin/rabbitmqctl set_user_tags admin administrator
