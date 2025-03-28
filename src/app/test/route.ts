export async function GET() {

  return Response.json({ 
    error_code: 123,
    error_description: "",
    name: 'John Doe',
    info: ['apple', 'banana', 'orange'],
    profile: {
      age: 20,
      gender: 'male'
    }
  })
}