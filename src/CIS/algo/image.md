
# Raster

[Comparison gallery of image scaling algorithms](https://en.wikipedia.org/wiki/Comparison_gallery_of_image_scaling_algorithms)

## Scaling

### 最邻近差值（Nearest-neighbor interpolation）

> *最近邻插值（Nearest-Neighbor Interpolation）*也叫*近邻插值（Proximal Interpolation）*、*点采样（Point Sampling）*，是一种简单的一维或多维*多元插值（multivariant interpolation）*方法。通常用在实时3D渲染中选取纹理表面颜色值。

$$S=\left(w,h\right)$$
$$S'=\left(w',h'\right)$$
$$P_{(x,y)}=\left(\text{round}\left(x'\times\dfrac{w}{w'}\right), \text{round}\left(y'\times\dfrac{h}{h'}\right)\right)$$
$$C_{(x',y')}=C_{(x,y)}$$

![Comparison_of_1D_and_2D_interpolation](Comparison_of_1D_and_2D_interpolation.svg)

### 二维线性插值（Bilinear interpolation）

> *双线性插值（Bilinear Interpolation）*也叫*双线性滤波（Bilinear filtering）*、*双线性纹理映射（Bilinear Texture Mapping）*，即在两个方向上（如二维图形的*x*和*y*）进行*线性插值（Linear Interpolation）*实现。

$$S=\left(w,h\right)$$
$$S'=\left(w',h'\right)$$
$$
\begin{cases}
x=x'\times\dfrac{w}{w'}\\
y=y'\times\dfrac{h}{h'}
\end{cases}
$$
$$
\begin{cases}
P_{lb}=P_{\left(floor\left(x\right), floor\left(y\right)\right)}\\
P_{rb}=P_{\left(ceil\left(x\right), floor\left(y\right)\right)}\\
P_{rt}=P_{\left(ceil\left(x\right), ceil\left(y\right)\right)}\\
P_{lt}=P_{\left(floor\left(x\right), ceil\left(y\right)\right)}\\
\end{cases}
$$

### 二维立方插值（Bicubic interpolation）

### 傅立叶插值（Fourier-based interpolation）

### 边缘定向插值（Edge-directed interpolation）

### 图像跟踪（Image tracing）

### 深度卷积神经网络（Deep convolution neural networks）

### 感知损失的深度卷积神经网络（Deep concolution neural networks using perceptual loss）

# Vector
