import React, { useState, useEffect } from "react"
import { API } from 'aws-amplify';
import { TextField, Container } from "@material-ui/core"
import { getBookmarks } from '../graphql/queries';
import { addBookmark, deleteBookmark } from '../graphql/mutations'
import { Button } from '@material-ui/core';
const style = require('./index.module.css')
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



interface bookmark {
  title: String
  bookmark: String
  id: String
}

interface incomingData {

  data: {
    getBookmarks: bookmark[]
  }

}

export default function Home() {
  const classes = useStyles();

  const [bookmarkInput, setBookmarkInput] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const [bookmarkData, setBookmarkData] = useState<incomingData | null>(null)
  const [loading, setLoading] = useState(true)


  const fetchBookmark = async () => {

    try {

      const data = await API.graphql({
        query: getBookmarks
      })
      console.log('data', data)
      setBookmarkData(data as incomingData)
      setLoading(false)
    }
    catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    fetchBookmark()
  }, [])


  return (
    <div className={style.main_div} >
      <div className={style.input_maindiv} >
        {/* <TextField /> */}
        <div className={style.textfield_maindiv} >
       <TextField type="text" className={style.text_input}  variant='outlined' color='secondary'
          label='Title' value={bookmarkInput} onChange={(e) => {
          setBookmarkInput(e.target.value)
        }} />

        <TextField type="text" value={titleInput}  variant='outlined' color='secondary'
        className={style.text_input}
          label='Bookmark' onChange={(e) => {
          setTitleInput(e.target.value)
        }} />
        </div>

        <div className={style.addBkm_div} >
        <Button variant='outlined' color='primary' disabled={bookmarkInput.length < 5 || titleInput.length < 5} onClick={async () => {
          await API.graphql({
            query: addBookmark,
            variables: {
              title: titleInput,
              bookmark: bookmarkInput
            }
          })
          fetchBookmark()
          setBookmarkInput('')
          setTitleInput('')

        }} >Add Bookmark</Button>
        </div>

      </div>
     
     <Container maxWidth='md' >
     <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
            <div>
              <Grid container spacing={2}  >
                {bookmarkData && bookmarkData.data.getBookmarks.map((item) => {
                  return (
                    <Grid className={style.grid} item xs={12} md={6} lg={6} key={item.id} >

                      <Paper className={classes.paper} id={style.paper} >
                       <div className={style.printed_p} >
                       <p>title:</p>
                        <p>url:</p>
                       </div>
                       <div className={style.data_p} >
                        <p>{item.bookmark}</p>
                       <p>{item.title}</p>
                       </div>
                      </Paper>

                      <div className={style.del_btn} >
                        <Button  variant='outlined' color='secondary' onClick={async () => {
                          console.log("id", item.id)
                          await API.graphql({
                            query: deleteBookmark,
                            variables: {
                              id: item.id
                            }
                          })
                          fetchBookmark()
                        }} >Delete</Button>
                      </div>

                    </Grid>
                  )
                })}
              </Grid>

            </div>
          )}
      </div>
     </Container>

    </div>
  )
}
