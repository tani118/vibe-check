-- Vibe Checker Database Schema
-- Create these tables in your Supabase database

-- Users table (stores user credentials and profile info)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- In production, use proper password hashing
  avatar VARCHAR(10) DEFAULT '😊',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Current vibes table (stores the latest vibe for each user)
CREATE TABLE current_vibes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  vibe VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Vibe history table (stores all previous vibe results)
CREATE TABLE vibe_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  vibe VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Starred users table (stores which users each user has starred)
CREATE TABLE starred_users (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  starred_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, starred_user_id),
  CHECK (user_id != starred_user_id) -- Users can't star themselves
);

-- Create indexes for better performance
CREATE INDEX idx_current_vibes_user_id ON current_vibes(user_id);
CREATE INDEX idx_vibe_history_user_id ON vibe_history(user_id);
CREATE INDEX idx_starred_users_user_id ON starred_users(user_id);
CREATE INDEX idx_starred_users_starred_user_id ON starred_users(starred_user_id);

-- Insert some sample data (optional)
INSERT INTO users (username, password, avatar) VALUES 
  ('demo_user_1', 'password123', '😄'),
  ('demo_user_2', 'password123', '🤗'),
  ('demo_user_3', 'password123', '😎');

INSERT INTO current_vibes (user_id, vibe, score) VALUES
  (1, 'Pretty Good', 18),
  (2, 'Super Positive', 28),
  (3, 'Neutral', -2);

INSERT INTO vibe_history (user_id, vibe, score) VALUES
  (1, 'Pretty Good', 18),
  (1, 'Decent', 8),
  (2, 'Super Positive', 28),
  (2, 'Pretty Good', 16),
  (3, 'Neutral', -2),
  (3, 'Meh', -12);
