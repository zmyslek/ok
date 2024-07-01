// @ts-ignore
import express, { Request, Response } from 'express';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
// @ts-ignore
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;  // Ensure PORT is declared only once

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/getArtistDetails.php', createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: { '^/getArtistDetails.php': '/public/getArtistDetails.php' }
}));

app.use('/getAlbumDetails.php', createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: { '^/getAlbumDetails.php': '/public/getAlbumDetails.php' }
}));

app.get('/artist/:name', async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const response = await axios.get('https://musicbrainz.org/ws/2/artist/', {
            params: {
                query: `artist:${name}`,
                fmt: 'json'
            }
        });
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching artist details:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching artist details.' });
    }
});

app.get('/artist/:id/albums', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await axios.get('https://musicbrainz.org/ws/2/release-group', {
            params: {
                artist: id,
                type: 'album|single',
                fmt: 'json'
            }
        });
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching artist albums:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching artist albums.' });
    }
});

app.get('/artist/:id/releases', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await axios.get('https://musicbrainz.org/ws/2/release', {
            params: {
                artist: id,
                fmt: 'json'
            }
        });
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching artist releases:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching artist releases.' });
    }
});

app.get('/album/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://musicbrainz.org/ws/2/release-group/${id}`, {
            params: {
                fmt: 'json'
            }
        });
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching album details:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching album details.' });
    }
});

app.get('/album/:id/recordings', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await axios.get('https://musicbrainz.org/ws/2/recording', {
            params: {
                release: id,
                fmt: 'json'
            }
        });
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching album recordings:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching album recordings.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
