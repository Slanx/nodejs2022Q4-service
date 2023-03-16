import { MigrationInterface, QueryRunner } from "typeorm";

export class new1678864161429 implements MigrationInterface {
    name = 'new1678864161429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists" ("id" SERIAL NOT NULL, "artistsId" uuid, CONSTRAINT "REL_b1258cf7560cd97b330cf7e923" UNIQUE ("artistsId"), CONSTRAINT "PK_637e68fcd79d90c93a27c66972a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_albums" ("id" SERIAL NOT NULL, "albumsId" uuid, CONSTRAINT "REL_efc778ae742551c6b1efd43deb" UNIQUE ("albumsId"), CONSTRAINT "PK_817445cd1f63aebcab5bd55a720" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_tracks" ("id" SERIAL NOT NULL, "tracksId" uuid, CONSTRAINT "REL_c6f49f60cf32753d164b1d6f3b" UNIQUE ("tracksId"), CONSTRAINT "PK_7a7f123ebc8494fa1c1c013f267" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_8e913e288156c133999341156a" UNIQUE ("userId"), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_b1258cf7560cd97b330cf7e9231" FOREIGN KEY ("artistsId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_efc778ae742551c6b1efd43debb" FOREIGN KEY ("albumsId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_c6f49f60cf32753d164b1d6f3b4" FOREIGN KEY ("tracksId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_c6f49f60cf32753d164b1d6f3b4"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_efc778ae742551c6b1efd43debb"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_b1258cf7560cd97b330cf7e9231"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks"`);
        await queryRunner.query(`DROP TABLE "favorites_albums"`);
        await queryRunner.query(`DROP TABLE "favorites_artists"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
