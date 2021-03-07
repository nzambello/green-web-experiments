import { useState, useEffect } from "react";
import {
  GeistProvider,
  CssBaseline,
  Grid,
  Text,
  Card,
  Row,
  Note,
  Divider,
  Link,
  Loading,
} from "@geist-ui/react";

const lambdaAPI = `https://news-alert.netlify.app/.netlify/functions/news-alert-feed`;

const App = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      fetch(lambdaAPI)
        .then((data) => data.json())
        .then(setNews);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }, []);

  return (
    <GeistProvider>
      <CssBaseline />
      <div className="App">
        <Text h1>News App</Text>
        <main>
          {news && news?.length ? (
            news.map((nc) => (
              <section key={nc.title}>
                <Text h2>{nc.title}</Text>
                {nc.data?.map((n) => (
                  <Grid.Container gap={2} justify="center">
                    <Grid xs={24} md={12}>
                      <Card shadow style={{ width: "100%" }} key={n.link}>
                        <Card.Content>
                          <Text b>{n.title}</Text>
                        </Card.Content>
                        <Divider y={0} />
                        <Card.Content>
                          <Text>{n.contentSnippet}</Text>
                        </Card.Content>
                        <Card.Footer>
                          <Link target="_blank" href={n.link}>
                            {n.feedKey}
                          </Link>
                        </Card.Footer>
                      </Card>
                    </Grid>
                  </Grid.Container>
                ))}
              </section>
            ))
          ) : error ? (
            <Note type="error">Errore: {JSON.stringify(error)}</Note>
          ) : (
            <Row style={{ padding: "10px 0" }}>
              <Loading>Loading</Loading>
            </Row>
          )}
        </main>
      </div>
    </GeistProvider>
  );
};

export default App;
