import json
import logging
import sys
import requests
from llama_index import GPTVectorStoreIndex, download_loader
from llama_index.readers.schema.base import Document
import os
import openai
import random

def retrieveWeatherForSeller(weatherData):
    promptQ = "Based on the following weather: " + weatherData + "\n" +  ". Tell me in two sentences if there is a possibility of delays in shipments and why?\n"
    openai.api_key = "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"
    response = openai.Completion.create(
      engine="text-davinci-002",
      prompt=promptQ,
      temperature=0.5,
      max_tokens=256,
      top_p=1,
      frequency_penalty=0.0,
      presence_penalty=0.0
    )
    return(response.choices[0].text)

def retrieveLogsForSeller(logs):
    index = GPTSimpleVectorIndex.from_documents(logs)
    promptQ = "Based on the data, tell me in two sentences if there is a possibility of delays in shipments and why?\n"
    query_engine = index.as_query_engine()
    receipts_response = query_engine.query(promptQ, query_transform=ImageOutputQueryTransform(width=400))
    return receipts_response

def lambda_handler(event, context):
    
    print(event)
    resp = {}
    for sellerId in event:
        resp[sellerId] = {}
        resp[sellerId] = retrieveWeatherForSeller(event[sellerId]['weather']) + delays[random.randint(0,3)]
    
    for sellerId in event:
        logs = event[sellerId]['logs']
        docLogs = []
        for log in logs:
            docLogs.append(Document(log))
        resp[sellerId] = retrieveLogsForSeller(docLogs)  
    
    return resp
    
    
    
    
