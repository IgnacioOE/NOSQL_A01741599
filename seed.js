// Crear tablas

// CUSTOMERS
db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["cust_id"],
      properties: {
        _id: { bsonType: "objectId" },
        cust_id: { bsonType: "int" },
        first_name: { bsonType: "string", maxLength: 64 },
        last_name: { bsonType: "string", maxLength: 64 },
        email: { bsonType: "string", maxLength: 64 },
        contact: {
          bsonType: "object",
          properties: {
            street_address: { bsonType: "string", maxLength: 256 },
            postal_code: { bsonType: "string", maxLength: 64 },
            city: { bsonType: "string", maxLength: 256 },
            state_province: { bsonType: "string", maxLength: 256 },
            country: { bsonType: "string", maxLength: 64 },
            country_code: { bsonType: "string", maxLength: 64 },
            continent: { bsonType: "string", maxLength: 64 },
            loc_lat: { bsonType: "double" },
            loc_long: { bsonType: "double" }
          }
        },
        demographics: {
          bsonType: "object",
          properties: {
            age: { bsonType: "int" },
            commute_distance: { bsonType: "double" },
            credit_balance: { bsonType: "double" },
            education: { bsonType: "string", maxLength: 64 },
            full_time: { bsonType: "string", maxLength: 64 },
            gender: { bsonType: "string", maxLength: 64 },
            household_size: { bsonType: "int" },
            income: { bsonType: "double" },
            income_level: { bsonType: "string", maxLength: 64 },
            insuff_funds_incidents: { bsonType: "int" },
            job_type: { bsonType: "string", maxLength: 64 },
            late_mort_rent_pmts: { bsonType: "int" },
            marital_status: { bsonType: "string", maxLength: 64 },
            mortgage_amt: { bsonType: "double" },
            num_cars: { bsonType: "int" },
            num_mortgages: { bsonType: "int" },
            pet: { bsonType: "string", maxLength: 64 },
            rent_own: { bsonType: "string", maxLength: 64 },
            work_experience: { bsonType: "int" },
            yrs_current_employer: { bsonType: "int" },
            yrs_residence: { bsonType: "int" }
          }
        },
        survey: {
          bsonType: "object",
          properties: {
            completed_survey: { bsonType: "string", maxLength: 64 },
            rating: { bsonType: "int" },
            would_recommend: { bsonType: "string", maxLength: 64 },
            interested_in_premium_tier: { bsonType: "string", maxLength: 64 },
            interested_in_exclusive_offerings: { bsonType: "string", maxLength: 64 },
            mobile_device: { bsonType: "string", maxLength: 64 },
            television: { bsonType: "string", maxLength: 64 }
          }
        },
        segment_id: { bsonType: "int" },
        is_churner: { bsonType: "int" },
        yrs_customer: { bsonType: "int" },
        promotion_response: { bsonType: "int" }
      }
    }
  }
});

// MOVIES
db.createCollection("movies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["movie_id"],
      properties: {
        _id: { bsonType: "objectId" },
        movie_id: { bsonType: "int" },
        sku: { bsonType: "string", maxLength: 64 },
        title: { bsonType: "string", maxLength: 256 },
        year: { bsonType: "int" },
        genres: { 
          bsonType: "array",
          items: { bsonType: "string", maxLength: 64 }
        },
        runtime: { bsonType: "string", maxLength: 64 },
        list_price: { bsonType: "double" },
        cast: { bsonType: "array" },
        crew: { bsonType: "array" },
        metrics: {
          bsonType: "object",
          properties: {
            views: { bsonType: "int" },
            gross: { bsonType: "string", maxLength: 64 },
            budget: { bsonType: "string", maxLength: 64 }
          }
        },
        awards: { bsonType: "array" },
        studio: { bsonType: "array" },
        summary: { bsonType: "string", maxLength: 4000 },
        image_url: { bsonType: "string", maxLength: 4000 },
        nominations: { bsonType: "array" },
        main_subject: { bsonType: "string", maxLength: 64 },
        opening_date: { bsonType: "date" },
        wiki_article: { bsonType: "string", maxLength: 256 },
        added_at: { bsonType: "date" }
      }
    }
  }
});

// SALES
db.createCollection("sales", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        day_id: { bsonType: "date" },
        movie_id: { bsonType: "int" },
        cust_id: { bsonType: "int" },
        app: { bsonType: "string", maxLength: 64 },
        device: { bsonType: "string", maxLength: 64 },
        os: { bsonType: "string", maxLength: 64 },
        payment_method: { bsonType: "string", maxLength: 64 },
        pricing: {
          bsonType: "object",
          properties: {
            list_price: { bsonType: "double" },
            discount_type: { bsonType: "string", maxLength: 64 },
            discount_percent: { bsonType: "double" },
            actual_price: { bsonType: "double" }
          }
        }
      }
    }
  }
});

// ACTIVITIES
db.createCollection("activities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["os", "app", "device", "cust_id", "activity", "movie_id", "activity_time"],
      properties: {
        _id: { bsonType: "objectId" },
        os: { bsonType: "string", maxLength: 64 },
        app: { bsonType: "string", maxLength: 64 },
        device: { bsonType: "string", maxLength: 64 },
        cust_id: { bsonType: "int" },
        activity: { bsonType: "string", maxLength: 64 },
        genre_id: { bsonType: "int" },
        movie_id: { bsonType: "int" },
        activity_time: { bsonType: "date" }
      }
    }
  }
});

// SESSIONS
db.createCollection("sessions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        session_id: { bsonType: "int" },
        cust_id: { bsonType: "int" },
        start_time: { bsonType: "date" },
        end_time: { bsonType: "date" },
        elapsed_time: { bsonType: "int" }
      }
    }
  }
});

// CUSTOMER_FEEDBACK
db.createCollection("customer_feedback", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        day: { bsonType: "date" },
        userid: { bsonType: "string", maxLength: 64 },
        city: { bsonType: "string", maxLength: 64 },
        state_province: { bsonType: "string", maxLength: 64 },
        country: { bsonType: "string", maxLength: 64 },
        continent: { bsonType: "string", maxLength: 64 },
        customer_comments: { bsonType: "string", maxLength: 256 },
        email: { bsonType: "string", maxLength: 64 },
        cust_id: { bsonType: "int" }
      }
    }
  }
});

// MOVIE_AUDIT
db.createCollection("movie_audit", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        movie_id: { bsonType: "int" },
        precio_anterior: { bsonType: "double" },
        precio_nuevo: { bsonType: "double" },
        fecha_cambio: { bsonType: "date" }
      }
    }
  }
});

// SALES_SAMPLE
db.createCollection("sales_sample", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        day_id: { bsonType: "date" },
        movie_id: { bsonType: "int" },
        cust_id: { bsonType: "int" },
        pricing: {
          bsonType: "object",
          properties: {
            list_price: { bsonType: "double" },
            discount_type: { bsonType: "string", maxLength: 64 },
            discount_percent: { bsonType: "double" },
            actual_price: { bsonType: "double" }
          }
        }
      }
    }
  }
});

//// Insertar datos ////

// CUSTOMERS
const firstNames = ["Juan", "Maria", "Carlos", "Ana", "Luis", "Elena", "Pedro", "Sofia", "Jorge", "Lucia", "Miguel", "Carmen", "Raul", "Laura", "Diego"];
const lastNames = ["Gomez", "Lopez", "Martinez", "Hernandez", "Garcia", "Perez", "Sanchez", "Ramirez", "Torres", "Flores", "Rivera", "Gomez", "Reyes", "Morales", "Ortiz"];
const customers = [];
for (let i = 0; i < 15; i++) {
    customers.push({
        cust_id: NumberInt(i + 1),
        first_name: firstNames[i],
        last_name: lastNames[i],
        email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@example.com`,
        contact: {
            city: "Ciudad de México",
            country: "Mexico"
        },
        demographics: {
            age: NumberInt(20 + parseInt(Math.random() * 40)),
            marital_status: i % 2 === 0 ? "Single" : "Married"
        },
        segment_id: NumberInt((i % 3) + 1),
        survey: {
            rating: NumberInt((i % 5) + 1)
        }
    });
}
db.customers.insertMany(customers);
console.log(`Se han insertado los usuarios`);

// GENRE
const genresPool = ["Action", "Sci-Fi", "Comedy", "Drama", "Horror"];

// Actores
const actorsPool = [
    { name: "Leonardo DiCaprio", role: "Protagonist" },
    { name: "Scarlett Johansson", role: "Protagonist" },
    { name: "Tom Hanks", role: "Supporting" },
    { name: "Meryl Streep", role: "Supporting" },
    { name: "Denzel Washington", role: "Protagonist" },
    { name: "Natalie Portman", role: "Protagonist" },
    { name: "Brad Pitt", role: "Supporting" },
    { name: "Emma Stone", role: "Protagonist" },
    { name: "Will Smith", role: "Protagonist" },
    { name: "Jennifer Lawrence", role: "Supporting" }
];

const movieTitles = [
    "Inception", "The Matrix", "Interstellar", "Gladiator", "The Dark Knight",
    "Fight Club", "Pulp Fiction", "Forrest Gump", "The Avengers", "Titanic",
    "Avatar", "The Terminator", "Alien", "Jaws", "Jurassic Park",
    "Rocky", "Braveheart", "The Shining", "The Godfather", "Goodfellas"
];

// MOVIES
const movies = [];
for (let i = 0; i < 20; i++) {
    movies.push({
        movie_id: NumberInt(i + 100),
        title: movieTitles[i],
        year: NumberInt(1990 + i),
        genres: [genresPool[i % 5], genresPool[(i + 1) % 5]], 
        list_price: 19.99,
        cast: [actorsPool[i % 10], actorsPool[(i + 1) % 10]], 
        metrics: {
            views: NumberInt(i * 1500)
        }
    });
}
db.movies.insertMany(movies);
console.log(`Se han insertado las películas`);
