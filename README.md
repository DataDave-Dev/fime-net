# 🎓 FIME-NET

> **Plataforma Estudiantil Oficial** – La comunidad digital que conecta, organiza y potencia la experiencia universitaria en la **Facultad de Ingeniería Mecánica y Eléctrica (FIME) - UANL**. 🚀

**FIME-NET** es una plataforma web integral desarrollada **por alumnos, para alumnos** de FIME. Nuestro objetivo es centralizar recursos académicos, facilitar la comunicación estudiantil y optimizar la experiencia universitaria mediante soluciones tecnológicas innovadoras.

---

## 📚 Índice

- [📌 Introducción](#-introducción)
- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [⚙️ Instalación](#️-instalación)
- [🚀 Uso](#-uso)
- [📱 Funcionalidades](#-funcionalidades)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## 📌 Introducción

**FIME-NET** es la evolución digital de la vida estudiantil en la Facultad de Ingeniería Mecánica y Eléctrica. Una plataforma que integra:

- 🏫 **Información académica centralizada** - Horarios, calendarios y recursos
- 👥 **Comunidad estudiantil activa** - Conecta con compañeros de tu carrera
- 🗺️ **Navegación interactiva** - Mapa digital de la facultad
- 📚 **Gestión de materias** - Obten información para organizar tu carga académica
- 📅 **Eventos y actividades** - Mantente al día con la vida universitaria
- 👨‍🏫 **Lista de profesores** - Revisa a los mejores maestros para cada materia que necesites

Todo en una interfaz moderna, responsiva y pensada para la experiencia móvil.

---

## ✨ Características

### 🔐 **Sistema de Autenticación Avanzado**
- Registro y login con email institucional
- Integración con Google OAuth
- Verificación por correo electrónico
- Gestión segura de sesiones

### 🎨 **Diseño Moderno y Responsivo**
- Interfaz intuitiva y atractiva
- Optimizado para móviles y desktop
- Animaciones fluidas con Framer Motion
- Tema coherente con colores institucionales

### 🌐 **Navegación Inteligente**
- Menú adaptativo según el estado de usuario
- Breadcrumbs y navegación contextual
- Búsqueda rápida de contenido

### 📊 **Dashboard Personalizado**
- Panel de control para cada usuario
- Métricas académicas personalizadas
- Notificaciones importantes

---

## 🛠️ Tecnologías

### **Frontend**
- **Next.js 15** - Framework React para producción
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Framer Motion** - Animaciones y transiciones

### **Backend & Database**
- **Supabase** - Backend como servicio
- **PostgreSQL** - Base de datos relacional
- **Supabase Auth** - Sistema de autenticación

### **Desarrollo & Deploy**
- **Vercel** - Plataforma de deployment
- **Git** - Control de versiones
- **PNPM** - Gestor de paquetes rápido

---

## ⚙️ Instalación

### **Prerrequisitos**
- Node.js `>= 18.x`
- PNPM (recomendado) o NPM
- Git
- Cuenta en Supabase (para desarrollo)

### **Pasos de Instalación**

```bash
# Clona el repositorio
git clone https://github.com/DataDave-Dev/fime-net.git

# Navega al directorio del proyecto
cd fime-net

# Instala las dependencias
pnpm install
# o
npm install

# Configura las variables de entorno
cp .env.example .env.local

# Inicia el servidor de desarrollo
pnpm dev
# o
npm run dev
```

### **Variables de Entorno**

Crea un archivo `.env.local` con las siguientes variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Uso

1. **Registro**: Crea tu cuenta con tu email
2. **Verificación**: Confirma tu cuenta a través del email
3. **Exploración**: Navega por las diferentes secciones
4. **Personalización**: Configura tu perfil y preferencias
5. **Participación**: Únete a la comunidad estudiantil

---

## 📱 Funcionalidades

### **🏠 Página Principal**
- Hero section informativo
- Acceso rápido a secciones principales
- Últimas noticias y eventos

### **📚 Gestión de Materias**
- Lista completa de materias por carrera
- Información detallada de cada materia
- Recursos académicos asociados

### **👥 Comunidad**
- Foros de discusión por carrera
- Sistema de mensajería (próximamente)
- Grupos de estudio

### **🗺️ Mapa Interactivo**
- Navegación por la facultad
- Ubicación de salones y laboratorios
- Rutas optimizadas

### **📅 Eventos y Calendario**
- Calendario académico oficial
- Eventos estudiantiles
- Recordatorios importantes

### **👨‍🏫 Directorio de Profesores**
- Información de contacto
- Horarios de atención
- Evaluaciones estudiantiles

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto es **por y para los estudiantes** de FIME.

### **Cómo Contribuir**

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### **Reportar Bugs**
- Usa GitHub Issues
- Describe el problema detalladamente
- Incluye pasos para reproducir el bug

### **Solicitar Features**
- Abre un Issue con la etiqueta "enhancement"
- Explica el beneficio para la comunidad estudiantil
- Proporciona mockups si es posible

---

<!-- ## 🎯 Roadmap

### **Versión 2.0** (Próximamente)
- [ ] Sistema de marketplace académico
- [ ] Asesorías peer-to-peer
- [ ] App móvil nativa
- [ ] Notificaciones push
- [ ] Sistema de reputación

### **Versión 2.5** (Futuro)
- [ ] Integración con sistemas institucionales
- [ ] IA para recomendaciones académicas
- [ ] Gamificación del aprendizaje
- [ ] Análitics avanzados -->

---

<!-- ## 📞 Contacto

- **Email**: fime-net@gmail.mx
- **Website**: [fime-net.vercel.app](https://fime-net.vercel.app)
- **Instagram**: 
- **Facebook**: 
- **X**: 
  -->

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **FIME UANL** - Por ser nuestra casa de estudios
- **Comunidad Estudiantil** - Por el feedback y apoyo continuo
- **Contribuidores** - Por hacer este proyecto posible

---

<div align="center">
  <p><strong>Desarrollado con ❤️ por estudiantes de FIME para estudiantes de FIME</strong></p>
  <p><em>"Innovación tecnológica para el futuro académico"</em></p>
</div>