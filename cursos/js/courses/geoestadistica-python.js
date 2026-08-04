const COURSE_DATA = {
  title: "GeoEstadística con Python",
  subtitle: "Domina el análisis estadístico espacial y la interpolación avanzada",
  hours: 12,
  modules: [
    {
      id: "mod-1",
      title: "Fundamentos de Geoestadística",
      description: "Teoría de variables regionalizadas y autocorrelación espacial.",
      icon: "📊",
      lessons: [
        {
          id: "les-1-1",
          title: "Variogramas y Semivariogramas",
          type: "video",
          duration: "45 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Entendiendo la continuidad espacial.",
          reading: "**Análisis espacial avanzado**\n\nLa geoestadística nos permite predecir valores en puntos no muestreados.",
          resources: []
        }
      ],
      quiz: { id: "q1", title: "Quiz 1", passingScore: 70, questions: [] }
    },
    {
      id: "mod-2",
      title: "Métodos de Interpolación",
      description: "Kriging, IDW y métodos estocásticos.",
      icon: "🗺️",
      lessons: [
        {
          id: "les-2-1",
          title: "Kriging Ordinario y Simple",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Predicción óptima con Python.",
          reading: "**Kriging con PyKrige**\n\nUso de librerías especializadas para generar superficies de predicción.",
          resources: []
        }
      ],
      quiz: { id: "q2", title: "Quiz 2", passingScore: 70, questions: [] }
    }
  ]
};
