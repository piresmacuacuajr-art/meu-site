import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

import { sendLeadEmail, sendVisitEmail } from './src/lib/mailer.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/submit-lead', async (req, res) => {
    const lead = req.body;
    console.log('Received Lead Submission:', lead);

    const success = await sendLeadEmail(lead);
    
    // We return success even if email fails to keep the UI flow smooth
    res.status(200).json({ 
      success: true, 
      message: success ? 'Lead submetido com sucesso.' : 'Lead capturado, erro no envio do e-mail.' 
    });
  });

  app.post('/api/submit-visit', async (req, res) => {
    const visit = req.body;
    console.log('Received Visit Request:', visit);

    const success = await sendVisitEmail(visit);
    
    res.status(200).json({ 
      success: true, 
      message: success ? 'Pedido de visita enviado.' : 'Pedido capturado, erro no e-mail.' 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();