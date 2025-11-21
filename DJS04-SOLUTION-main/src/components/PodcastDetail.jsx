import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { genres } from "../data";
import { formatDate } from "../utils/formatDate";
import styles from "./PodcastDetail.module.css";

/**
 * PodcastDetail Component
 * 
 * Displays detailed information about a specific podcast including:
 * - Cover image and title
 * - Description
 * - Genres
 * - All seasons with episode listings
 * 
 * Fetches data from the API using the podcast ID from the URL params.
 */
export default function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    async function fetchPodcastDetail() {
      try {
        setLoading(true);
        const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch podcast: ${res.status}`);
        const data = await res.json();
        setPodcast(data);
        setSelectedSeason(1); // Default to season 1
      } catch (err) {
        console.error("Error fetching podcast details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPodcastDetail();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading podcast details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Error loading podcast: {error}</p>
          <Link to="/" className={styles.backButton}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className={styles.container}>
        <p>Podcast not found</p>
        <Link to="/" className={styles.backButton}>← Back to Home</Link>
      </div>
    );
  }

  const genreNames = podcast.genres.map((genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.title : `Unknown`;
  });

  const currentSeason = podcast.seasons.find(s => s.season === selectedSeason);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>← Back to Home</Link>
      
      <div className={styles.header}>
        <img 
          src={podcast.image} 
          alt={podcast.title} 
          className={styles.coverImage}
        />
        
        <div className={styles.info}>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>
          
          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <strong>GENRES</strong>
              <div className={styles.genreTags}>
                {genreNames.map((name, idx) => (
                  <span key={idx} className={styles.genreTag}>{name}</span>
                ))}
              </div>
            </div>
            
            <div className={styles.metaItem}>
              <strong>LAST UPDATED</strong>
              <p>{formatDate(podcast.updated)}</p>
            </div>
            
            <div className={styles.metaItem}>
              <strong>TOTAL SEASONS</strong>
              <p>{podcast.seasons.length} Seasons</p>
            </div>
            
            <div className={styles.metaItem}>
              <strong>TOTAL EPISODES</strong>
              <p>{podcast.seasons.reduce((acc, s) => acc + s.episodes.length, 0)} Episodes</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.seasonsSection}>
        <h2>Current Season</h2>
        
        <div className={styles.seasonSelector}>
          {podcast.seasons.map((season) => (
            <button
              key={season.season}
              className={`${styles.seasonButton} ${selectedSeason === season.season ? styles.active : ''}`}
              onClick={() => setSelectedSeason(season.season)}
            >
              Season {season.season}
            </button>
          ))}
        </div>

        {currentSeason && (
          <div className={styles.seasonContent}>
            <div className={styles.seasonHeader}>
              <img 
                src={currentSeason.image} 
                alt={currentSeason.title} 
                className={styles.seasonImage}
              />
              <div>
                <h3>{currentSeason.title}</h3>
                <p className={styles.episodeCount}>{currentSeason.episodes.length} Episodes</p>
              </div>
            </div>

            <div className={styles.episodesList}>
              {currentSeason.episodes.map((episode, idx) => (
                <div key={idx} className={styles.episodeCard}>
                  <div className={styles.episodeNumber}>{idx + 1}</div>
                  <div className={styles.episodeInfo}>
                    <h4>{episode.title}</h4>
                    <p className={styles.episodeDescription}>{episode.description}</p>
                    {episode.file && (
                      <audio controls className={styles.audioPlayer}>
                        <source src={episode.file} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}