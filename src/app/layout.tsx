import type { Metadata } from "next";
import "../styles/globals.css";
import TopMenu from "@/components/ui/top-menu/TopMenu";
import Footer from "@/components/ui/footer/Footer";
import { WebFont } from "@/config/fonts";

export const metadata: Metadata = {
  title: "FIME-NET | Comunidad de Alumnos de la Facultad de Ingeniería Mecánica y Eléctrica",
  description: "Conecta, aprende y colabora con la comunidad de estudiantes de la FIME. Encuentra recursos, eventos, y proyectos para tu crecimiento profesional.",
  keywords: ["FIME", "Ingeniería", "Mecánica", "Eléctrica", "Comunidad", "Estudiantes", "Proyectos", "Recursos"],
  authors: [{ name: "Equipo FIME-NET", url: "https://fimenet.mx" }],
  openGraph: {
    title: "FIME-NET | Comunidad de Alumnos de la Facultad de Ingeniería Mecánica y Eléctrica",
    description: "Conecta, aprende y colabora con la comunidad de estudiantes de la FIME.",
    url: "https://fimenet.mx",
    type: "website",
    images: [
      {
        url: "https://fimenet.mx/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FIME-NET - Comunidad de estudiantes",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${WebFont} antialiased`}>
        <TopMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
