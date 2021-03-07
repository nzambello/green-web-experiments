import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'


export async function getStaticProps() {
  try {
    const res = await fetch(process.env.LAMBDA_API)
    const news = await res.json()

    return {
      props: {
        news
      }
    }
  } catch (error) {
    return { props: { error: error.message } }
  }
}

export default function Home({ news, error }) {
  let content = null

  if (error) {
    content = (
      <p role="alert" style={{ border: '1px solid red', background: 'rgba(255, 0,0, 0.1)', padding: '1rem' }}>
        Error: {JSON.stringify(error)}
      </p>
    )
  } else if (!news) {
    content = (
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <p>Loading...</p>
      </div>
    )
  } else {
    content = news.map((nc) => (
      <section className={styles.section} key={nc.title}>
        <h2>{nc.title}</h2>
        <div className={styles.grid}>
          {nc.data?.map((n) => (
            <div className={styles.card} key={n.link}>
              <h3>{n.title}</h3>
              <hr />
              <p>{n.contentSnippet}</p>
              <p>
                <a target="_blank" href={n.link}>
                  {n.feedKey}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
    ))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>News App Nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>News App</h1>

        {content}
      </main>
    </div>
  )
}
