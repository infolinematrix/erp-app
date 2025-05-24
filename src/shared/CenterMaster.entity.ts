import { Entity, Fields, Relations, remult, repo, Validators } from 'remult';

@Entity('center_master', {
  allowApiCrud: true,
  
})
export class CenterMaster {
    @Fields.autoIncrement()
    id!: number;

    @Fields.string()
    center_code!: string;


    @Fields.string()
    name!: string;

    @Fields.string()
    email!: string;

    @Fields.string()
    address!: string;

    @Fields.string()
    phone!: string;

    @Fields.string()
    city!: string;

    @Fields.string()
    country!: string;

    @Fields.string()
    prefix!: 'MAIN';


    @Fields.number()
    is_active!: number;


}