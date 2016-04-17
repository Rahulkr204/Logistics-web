
from django.shortcuts import render

# Create your views here.
# def about(request):
# 	return render(request, "about.html", {})

def dashboard(request):
	return render(request,"dashboard.html",{})

def faq(request):
	return render(request,"faq.html",{})

def orders(request):
	return render(request,"dashboard.html",{})

def trucks(request):
	return render(request,"trucks.html",{})

def drivers(request):
	return render(request,"drivers.html",{})

def add_driver(request):
	return render(request,"add_driver.html",{})

def triplist(request):
	return render(request,"triplist.html",{})