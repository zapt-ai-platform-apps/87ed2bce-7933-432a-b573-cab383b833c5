-- Create profiles table
CREATE TABLE "profiles" (
  "id" UUID PRIMARY KEY,
  "name" TEXT,
  "role" TEXT NOT NULL DEFAULT 'employee',
  "leave_balance" INTEGER DEFAULT 20 -- Default leave balance
);

-- Create leaves table
CREATE TABLE "leaves" (
  "id" SERIAL PRIMARY KEY,
  "employee_id" UUID REFERENCES profiles(id),
  "start_date" DATE NOT NULL,
  "end_date" DATE NOT NULL,
  "type" TEXT NOT NULL,
  "comment" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);