import requests
from bs4 import BeautifulSoup
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import chromedriver_binary

URL = 'https://diaryofcas.wordpress.com/'

driver = webdriver.Chrome()
driver.get(URL)

ScrollNumber = 8
for i in range(1,ScrollNumber):
    driver.execute_script("window.scrollTo(1,50000)")
    time.sleep(3)

page = driver.page_source
soup = BeautifulSoup(page, 'html.parser')

links = soup.find_all("a", class_='more-link')
links.reverse()
for link in links:
    driver.get(link.get('href'))
    time.sleep(2)
    postPage = driver.page_source
    post = BeautifulSoup(postPage, 'html.parser')
    title = post.find("h1")
    titleLink = title.find('a').contents[0]
    print(titleLink)
    content = post.find('div', class_='post-content')
    print(content.prettify())
    send = {'content': content.prettify(),
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OTY4NjUxNzgsImZpcnN0X25hbWUiOiJBbml0YW4iLCJ1c2VybmFtZSI6ImRpYXJ5b2ZjYXMgb2xkIHBvc3RzIiwicGhvdG9fdXJsIjoiaHR0cHM6Ly90Lm1lL2kvdXNlcnBpYy8zMjAvaDc1QlhabjdreWxXM1FnQm03dlY3Vlg1TmNJdzNTeWpfZTc0bG1pS0pnWS5qcGciLCJhdXRoX2RhdGUiOjE2MjEzOTY5OTMsImhhc2giOiI1ZWI5YWQ4YzVmZDFmOTI4NjBhZDZkNmY3NWI1ZDU1YmViNWM4NGZhMWM2OGRiZjZiZjVhZGQxZTExZWMwYTQ0Iiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjE0OTEzNjEsImV4cCI6MTYyMjA5NjE2MX0.PjU4Mt9C0dnSCGKJUqmiyQGc8RqiE6R6UTaKVUH0XDw',
    'title': titleLink}
    x = requests.post('http://localhost:3000/submissions', json =send )
driver.close()

