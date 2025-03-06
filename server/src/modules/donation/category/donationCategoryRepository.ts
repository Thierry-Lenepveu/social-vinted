import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type DonationCategory = {
  id: number;
  name: string;
};

class DonationCategoryRepository {
  // The C of CRUD - Create operation
  async create(donationCategory: Omit<DonationCategory, "id">) {
    // Execute the SQL INSERT query to insert a new donation category into the "donation_category" table
    const [result] = await databaseClient.query<Result>(
      "insert into donation_category (name) values (?)",
      [donationCategory.name],
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific donation category by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from donation_category where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the donation category
    return rows[0] as DonationCategory;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all donation categories from the "donation_category" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from donation_category",
    );

    // Return the array of users
    return rows as DonationCategory[];
  }

  // The U of CRUD - Update operation
  async update(donationCategory: DonationCategory) {
    // Execute the SQL UPDATE query to update the donation category by its ID
    const [result] = await databaseClient.query<Result>(
      "update donation_category set name = ? where id = ?",
      [donationCategory.name, donationCategory.id],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove the donation category by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from donation_category where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new DonationCategoryRepository();
