import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 粒子配置
  const particlesConfig = {
    density: 8000, // 粒子密度
    speed: 0.5, // 运动速度
    color: '#00ffff', // 主色调
    pinkColor: '#ff0080', // 辅助色调
    size: 2, // 粒子大小
    hoverRadius: 100, // 鼠标悬停影响半径
    rippleEffect: true // 涟漪效果
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 粒子数组
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = []

    // 初始化粒子
    for (let i = 0; i < canvas.width * canvas.height / particlesConfig.density; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particlesConfig.speed,
        vy: (Math.random() - 0.5) * particlesConfig.speed,
        size: Math.random() * particlesConfig.size + 1,
        color: Math.random() > 0.8 ? particlesConfig.pinkColor : particlesConfig.color
      })
    }

    // 鼠标位置
    let mouseX = 0
    let mouseY = 0

    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // 更新位置
        particle.x += particle.vx
        particle.y += particle.vy

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // 鼠标悬停效果
        const distance = Math.sqrt(
          Math.pow(particle.x - mouseX, 2) + Math.pow(particle.y - mouseY, 2)
        )

        if (distance < particlesConfig.hoverRadius && particlesConfig.rippleEffect) {
          // 涟漪效果
          const force = (particlesConfig.hoverRadius - distance) / particlesConfig.hoverRadius
          const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX)
          particle.vx += Math.cos(angle) * force * 0.05
          particle.vy += Math.sin(angle) * force * 0.05

          // 绘制连接线
          ctx.beginPath()
          ctx.strokeStyle = `${particle.color}33` // 半透明
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // 清理
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // 跳转函数
  const handleEnterLearning = () => {
    navigate('/main')
  }

  return (
    <div className="centered-content">
      {/* 粒子背景 */}
      <canvas
        ref={canvasRef}
        className="particles-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* 标题 */}
      <h1 className="title">循环星球</h1>

      {/* 进入按钮 */}
      <button 
        className="btn" 
        onClick={handleEnterLearning}
      >
        沉浸学习
      </button>
    </div>
  )
}

export default LandingPage