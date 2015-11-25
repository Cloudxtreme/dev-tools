export SPARK_HOME=/Users/saket.kumar/Applications/spark-1.1.0
export CLICOLOR=1
alias vial='subl ~/bin/env.sh'
alias ll='ls -l'
#alias personal-key='ssh-add ~/.ssh/id_skate056_rsa'
alias pkey='fn_apply_keys ~/.ssh/id_skate056_rsa'
alias wkey='fn_apply_keys ~/.ssh/id_rsa'
alias keys='fn_list_keys'

alias play='cd /Users/saket.kumar/tekas/studs/playground/'
#alias scala='cd /Users/saket.kumar/tekas/studs/playground/'

# Java home aliases
alias j7='export JAVA_HOME=`/usr/libexec/java_home -v 1.7`'
alias j8='export JAVA_HOME=`/usr/libexec/java_home -v 1.8`'
alias scala210='/usr/local/Cellar/scala210/2.10.4/bin/scala'
export JAVA_HOME=$(/usr/libexec/java_home)

#git
alias gs='git status'
alias gpl='git pull'
alias gru='git remote show origin'
alias gi='git fetch;git log ..origin/master'
alias go='git fetch;git log origin/master..'
alias gr='git pull --rebase'
alias gu='git reset --soft HEAD~1'
#alias gl='git log --oneline'
alias gl='git log --pretty="%Cred%h %Cgreen%cr %m %Cblue%an %Creset%s" --abbrev-commit'
alias mgl='gl --author=saket.kumar@aimia.com'
alias pick='git cherry-pick'
alias gl1='git log --graph --oneline --all'
alias gl2="git log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
alias gl3="git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all"

export GROOVY_HOME=/usr/local/opt/groovy/libexec

function fn_list_keys(){
	echo " -- Current ssh keys -- "
	ssh-add -l
	echo " ---------------------- "
}

function fn_apply_keys(){
	echo "Adding" $1
	fn_list_keys

	ssh-add -D
	echo "Deleted all keys"
	ssh-add $1
	
	fn_list_keys
}

alias http='python -m SimpleHTTPServer'

alias latest_spark_log='ls -bt1 /var/lib/spark/work/app-*-0000/*/stdout | head -1'

#alias agent='eval $(ssh-agent) && ssh-add -k'

export PROMPT_COMMAND=__prompt_command  # Func to gen PS1 after CMDs

function parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

function __prompt_command() {
    local EXIT="$?"             # This needs to be first
    PS1=""

    local RCol='\[\e[0m\]'

    local Red='\[\e[0;31m\]'
    local Gre='\[\e[0;32m\]'
    local BYel='\[\e[1;33m\]'
    local BBlu='\[\e[1;34m\]'
    local Pur='\[\e[0;35m\]'

    if [ $EXIT != 0 ]; then
        PS1+="${Pur}\W${BYel}$(parse_git_branch) ${Red}$ ${RCol}"      # Add red if exit code non 0
    else
        PS1+="${Pur}\W${BYel}$(parse_git_branch) ${Gre}$ ${RCol}"
    fi
}

source env-secured.sh
# Docker stuff
#export DOCKER_HOST=tcp://192.168.59.103:2376
#export DOCKER_CERT_PATH=/Users/saket.kumar/.boot2docker/certs/boot2docker-vm
#export DOCKER_TLS_VERIFY=1

#docker-ip() {
#  boot2docker ip 2> /dev/null
#}

alias docker-env='eval $(docker-machine env default)'

cql() {
    cqlsh localhost 9042
}

dk() {
    . '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'
}
export PATH=$PATH:/Users/saket.kumar/Applications/dse/bin
export MOOC="/Users/saket.kumar/tekas/playground/spark-edx-course/mooc-setup-master"
