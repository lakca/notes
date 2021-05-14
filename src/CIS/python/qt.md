> 基于 PySide6/PyQt6

# 基本

*For any GUI application using Qt, there is precisely one `QGuiApplication` object no matter whether the application has 0, 1, 2 or more windows at any given time. For non-GUI Qt applications, use `QCoreApplication` instead, as it does not depend on the Qt GUI module. For `QWidget` based Qt applications, use `QApplication` instead, as it provides some functionality needed for creating `QWidget` instances.*

# 使用

## Signal

```py
# 创建
sig1 = QtCore.Signal() # 无参数
sig2 = QtCore.Signal(str) # 有参数
sig3 = QtCore.Signal((str,), (int,)) # 重载
# 触发
sig1.emit()
sig2.emit("Hello")
sig3.emit(1)
# 监听/connect
sig1.connect(listener)
```

## Thread

```py
QtCore.QTimer()
```

## Application

```py
app = QtWidgets.QApplication([])

root = RootWidget()
root.resize(800, 600)
root.show()

sys.exit(app.exec_())
```

## Widget

```py
button = QtWidgets.QPushButton("Click Me!")
button.clicked.connect(onClick)

text = QtWidgets.QLabel("Hello World!")
```

## Layout

```py
layout = QtWidgets.QVBoxLayout(self)
layout.addWidget()
```

## Menu / Menu Bar

```py
# 菜单栏
menubar = QtWidgets.QMenuBar(self)
menubar.setNativeMenuBar(True) # 使用系统菜单栏（MacOS有效）
# 菜单项
fileMenu = QtWidgets.QMenu(menubar, "File")
fileMenu = menuBar.addMenu(fileMenu)
# 菜单项操作
openAction = QtGui.QAction(fileMenu, "Open")
fileMenu.addAction(openAction)
# 菜单项操作组
OpenRecentGroup = QtGui.QActionGroup(fileMenu, "Open Recent")
fileMenu.addAction(OpenRecentGroup)
```

## Status Bar

```py
statusBar = QtWidgets.QStatusBar(self)
statusBar.showMessage("Hello World!")
```

## 关闭 Widget 时执行操作

```py
# Widget
class MyWidget(QtWidgets.QWidget):
  def closeEvent(self, event):
    r'''
    override `closeEvent()`
    '''
    if can_exit:
      event.accept()
    else:
      event.ignore()

# application
app.aboutToQuit.connect(listener)
```
