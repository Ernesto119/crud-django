from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from .form import TaskForm
from .models import Task


def index(request):
    tasks = Task.objects.all()
    return render(request, "index.html", {"form": TaskForm, "tasks": tasks})


def create(request):
    form = TaskForm()
    if request.method == "POST":
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()

    return redirect("/")


def read(request):
    pass


def update(request, pk):
    task = Task.objects.get(pk=pk)
    if request.method == "POST":
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect("/")
    else:
        form = TaskForm(instance=task)
    return render(request, "update.html", {"form": form})


def delete(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()
    return redirect("/")

def complete(request,pk):
    task = Task.objects.get(pk=pk)
    task.status = True
    print(task.status)
    task.save()
    return redirect('/')