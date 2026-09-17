import careerResources from "../data/careerData";


export default function Career() {
  return (
    <div className="career-page">
      <h1>Career Management</h1>
      <p className="career-intro">
        Build your skills and prepare for your career journey.
      </p>

      <div className="career-grid">
        {careerResources.map((resource) => (
          <div className="career-card" key={resource.title}>
            <div className="career-icon">{resource.icon}</div>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <button onClick={() => alert(`Opening ${resource.title}`)}>
            Explore
        </button>
          </div>
        ))}
      </div>
    </div>
  );
}