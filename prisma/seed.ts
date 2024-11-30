import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    const images = [
      'https://djereformas.com.br/wp-content/uploads/2024/03/gesseiro.jpg',
      'https://img.freepik.com/fotos-gratis/homem-um-tecnico-eletrico-que-trabalha-em-um-quadro-de-distribuicao-com-fusiveis-usa-um-tablet_169016-24811.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUVE55iHpBVhrJFosWZ9sz6GB6i2wfhWBw-Q&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7xg1o_xj6n3blTx9S1MGZTQiTRx8E66NgQ&s',
      'https://sebrae.com.br/Sebrae/Portal%20Sebrae/Ideias%20de%20Negocio/Importer/Images/524_background.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCqAKmGZchKapK5ki97tozexnrmj-190dlA&s',
      'https://st.depositphotos.com/7247698/56662/i/450/depositphotos_566626298-stock-photo-happy-black-african-women-engineer.jpg',
      'https://findes.com.br/wp-content/uploads/2021/03/Foto-Beneficios_450x300px.png',
      'https://st2.depositphotos.com/1158045/6627/i/450/depositphotos_66276007-stock-photo-worker-in-factory-showing-thumbs.jpg',
    ]

    const professionalNames = [
      'Carlos Pedreiro',
      'João Eletricista',
      'Maria Encanadora',
      'Ana Pintora',
      'Pedro Gesseiro',
      'Lucas Reformas',
      'Clara Manutenção',
      'Fernanda Construção',
      'Rafael Reparo',
    ]

    const addresses = [
      'Rua das Reformas, 123',
      'Avenida da Construção, 456',
      'Travessa do Serviço, 789',
      'Praça da Manutenção, 101',
      'Alameda das Obras, 202',
      'Estrada do Pedreiro, 303',
      'Avenida Elétrica, 404',
      'Rua dos Reparos, 505',
      'Praça do Encanador, 606',
    ]

    const services = [
      {
        name: 'Serviço de Pedreiro',
        description:
          'Construção e reforma de estruturas residenciais e comerciais.',
        price: 300.0,
        imageUrl:
          'https://media.istockphoto.com/id/149319892/pt/foto/sorrir-trabalhadores-a-falar-ao-ar-livre.jpg?s=612x612&w=0&k=20&c=MRJFRwXTIKC7Ht2Xm5A2QZfHRBwXYWh19b3H7nfTW4E=',
      },
      {
        name: 'Serviço de Eletricista',
        description: 'Instalação e reparo de sistemas elétricos.',
        price: 200.0,
        imageUrl:
          'https://media.istockphoto.com/id/149319892/pt/foto/sorrir-trabalhadores-a-falar-ao-ar-livre.jpg?s=612x612&w=0&k=20&c=MRJFRwXTIKC7Ht2Xm5A2QZfHRBwXYWh19b3H7nfTW4E=',
      },
      {
        name: 'Serviço de Encanador',
        description: 'Manutenção e reparo de sistemas hidráulicos.',
        price: 250.0,
        imageUrl:
          'https://media.istockphoto.com/id/149319892/pt/foto/sorrir-trabalhadores-a-falar-ao-ar-livre.jpg?s=612x612&w=0&k=20&c=MRJFRwXTIKC7Ht2Xm5A2QZfHRBwXYWh19b3H7nfTW4E=',
      },
      {
        name: 'Serviço de Pintura',
        description: 'Pintura interna e externa com acabamento profissional.',
        price: 150.0,
        imageUrl:
          'https://media.istockphoto.com/id/149319892/pt/foto/sorrir-trabalhadores-a-falar-ao-ar-livre.jpg?s=612x612&w=0&k=20&c=MRJFRwXTIKC7Ht2Xm5A2QZfHRBwXYWh19b3H7nfTW4E=',
      },
      {
        name: 'Serviço de Gesseiro',
        description: 'Aplicação de gesso para acabamento e decoração.',
        price: 180.0,
        imageUrl:
          'https://media.istockphoto.com/id/149319892/pt/foto/sorrir-trabalhadores-a-falar-ao-ar-livre.jpg?s=612x612&w=0&k=20&c=MRJFRwXTIKC7Ht2Xm5A2QZfHRBwXYWh19b3H7nfTW4E=',
      },
    ]

    // Criar 10 barbearias com nomes e endereços fictícios
    const professionals = []
    for (let i = 0; i < 9; i++) {
      const name = professionalNames[i]
      const address = addresses[i]
      const imageUrl = images[i]

      const profissional = await prisma.professional.create({
        data: {
          name,
          address,
          imageUrl,
          phones: ['(11) 99999-9999', '(11) 99999-9999'],
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus. Donec pretium convallis iaculis. Etiam eu felis sollicitudin, cursus mi vitae, iaculis magna. Nam non erat neque. In hac habitasse platea dictumst. Pellentesque molestie accumsan tellus id laoreet.',
        },
      })

      for (const service of services) {
        await prisma.professionalService.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            professional: {
              connect: {
                id: profissional.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        })
      }

      professionals.push(profissional)
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect()
  } catch (error) {
    console.error('Erro ao criar as barbearias:', error)
  }
}

seedDatabase()
