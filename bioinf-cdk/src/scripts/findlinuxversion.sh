# from this article
#https://www.cyberciti.biz/faq/how-to-check-amazon-linux-version-ec2-instance/

ssh ec2-user@server-ip-here

# Use one of these commands
cat /etc/os-release

grep -E -w 'VERSION|NAME|PRETTY_NAME' /etc/os-release