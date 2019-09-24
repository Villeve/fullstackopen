/* eslint-disable */
var listOfBlogs = [
    {
        "title": "The Awesome Blog",
        "author": "LeBron James",
        "url": "www.nba.com",
        "likes": 9000,
        "id": "5d8390469e7853278a40b1d9"
    },
    {
        "title": "Fisherman's Days",
        "author": "Farrah the Fisher",
        "url": "www.fishing.com",
        "likes": 94,
        "id": "5d8390959e7853278a40b1da"
    },
    {
        "title": "Shopping Heaven",
        "author": "Sarah Shopper",
        "url": "www.shopping.com",
        "likes": 763,
        "id": "5d83aaf765425f35601c00d4"
    },
    {
        "title": "Crazy Car Modifications",
        "author": "Max Oilyhands",
        "url": "www.crazycarmods.com",
        "likes": 5938,
        "id": "5d83b74e77a46f39ad692897"
    }
]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (largest, item) => {
        if(largest < item.likes) return item.likes
        else return largest
    }

    const maxLikes = blogs.reduce(reducer, 0)

    const result = blogs.find(blog => {
        return blog.likes === maxLikes
      })
    
    if(result === undefined) return []
    else return result
}

//console.log(favoriteBlog(listOfBlogs))

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
