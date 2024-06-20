//Db types Entities

interface Image {
  PublicationDay: number;
  Name: string;
}

interface Publication {
  Day: number;
  Message: string;
}

type FullPublication = {
  found: boolean;
  day: number;
  message: string;
  imgs: Image[];
};
