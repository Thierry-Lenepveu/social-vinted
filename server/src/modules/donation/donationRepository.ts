import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Donation = {
  id: number;
  date: string;
  picture: string;
  title: string;
  description: string;
  condition_id: number;
  category_id: number;
  user_id: number;
};

class DonationRepository {
  // The C of CRUD - Create operation
  async create(donation: Omit<Donation, "id">) {
    const date = new Date(donation.date);

    // Execute the SQL INSERT query to add a new donation to the "donation" table
    const [result] = await databaseClient.query<Result>(
      "insert into donation (date, picture, title, description, condition_id, category_id, user_id) values (?, ?, ?, ?, ?, ?, ?)",
      [
        date.toISOString().slice(0, 19).replace("T", " "),
        donation.picture,
        donation.title,
        donation.description,
        donation.condition_id,
        donation.category_id,
        donation.user_id,
      ],
    );

    // Return the ID of the newly inserted donation
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific donation by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from donation where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the donation
    return rows[0] as Donation;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all donations from the "donation" table
    const [rows] = await databaseClient.query<Rows>("select * from donation");

    // Return the array of users
    return rows as Donation[];
  }

  // The U of CRUD - Update operation
  async update(donation: Donation) {
    const date = new Date(donation.date);

    const [result] = await databaseClient.query<Result>(
      "update donation set date = ?, picture = ?, title = ?, description = ?, condition_id = ?, category_id = ?, user_id = ? where id = ?",
      [
        date.toISOString().slice(0, 19).replace("T", " "),
        donation.picture,
        donation.title,
        donation.description,
        donation.condition_id,
        donation.category_id,
        donation.user_id,
        donation.id,
      ],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove the donation by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from donation where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new DonationRepository();
