export async function GET() {

  return Response.json({ 
    id: 123,
    name: 'John Doe',
    info: ['apple', 'banana', 'orange'],
    profile: {
      age: 20,
      gender: 'male'
    }
  })
}