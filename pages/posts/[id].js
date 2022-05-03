import Layout from '../../components/layout';
import axios from "axios";
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export default function Post({postData}) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <br />
        {postData.body}
        <br />
    </Layout>;
}

export async function getStaticPaths() {
    const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const paths = data.data.map(post => ({
        params: {
            id: post.id.toString()
        }
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps( paths ) {
    const postData = await axios.get(`https://jsonplaceholder.typicode.com/posts/${paths.params.id}`);
    return {
        props: {
            postData: postData.data
        },
    };
}