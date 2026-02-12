import { ModeProvider } from './context/ModeContext';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <ModeProvider>
      <Layout>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </Layout>
    </ModeProvider>
  );
}

export default App;
