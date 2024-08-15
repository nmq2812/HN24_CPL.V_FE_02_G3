"use client";

import { useEffect, useState } from 'react';
import { fetchArticles } from '@/services/articles';

import Banner from '@/components/banner';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const articles = await fetchArticles();
                setArticles(articles);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Banner />
            <h1>Articles</h1>
            <ul>
                {articles.map((article: any) => (
                    <li key={article.slug}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
