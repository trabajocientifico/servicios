const COURSE_DATA = {
  title: "Correos Masivos con Python",
  subtitle: "Automatiza tus comunicaciones con scripts de alta eficiencia",
  modules: [
    {
      id: "mod-1",
      title: "Módulo 1: Automatización Total",
      description: "Desde la conexión al servidor hasta el envío masivo.",
      icon: "✉️",
      lessons: [
        {
          id: "les-1-1",
          title: "Servidores SMTP y Seguridad",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Configura Gmail y Outlook para envíos automáticos.",
          reading: "**Marketing y Automatización**\n\nUsa la librería `smtplib` para conectar Python con tus servidores de correo de forma segura.",
          resources: []
        },
        {
          id: "les-1-2",
          title: "Plantillas HTML Dinámicas",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Diseña correos profesionales con código.",
          reading: "**Diseño Dinámico**\n\nAprenderás a inyectar nombres y datos específicos de una base Excel en el cuerpo del correo.",
          resources: []
        },
        {
          id: "les-1-3",
          title: "Gestión de Adjuntos Masivos",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Envía archivos únicos a cada destinatario.",
          reading: "**Eficiencia en Procesos**\n\nAutomatiza el envío de facturas, certificados o reportes personalizados.",
          resources: []
        }
      ],
      quiz: {
        id: "q1",
        title: "Quiz: Automatización",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué librería se usa para enviar correos?",
            options: ["Pandas", "Smtplib", "Numpy", "Matplotlib"],
            correct: 1,
            explanation: "Smtplib es la librería estándar de Python para el protocolo SMTP."
          }
        ]
      }
    }
  ]
};
