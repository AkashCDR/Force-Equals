import Company from '../models/Company.js';

export const createCompany = async (req, res) => {
  try {
    const { name, domain, matchScore } = req.body;
    
   
    if (!name || !domain || matchScore === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const company = new Company({
      name,
      domain,
      matchScore,
      createdBy: req.user.userId 
    });

    await company.save();

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Company domain already exists' });
    }
    res.status(500).json({ error: 'Error creating company' });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}).sort({ matchScore: -1 });
    res.json({ 
      success: true,
      companies 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies' });
  }
};

export const updateCompanyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['Target', 'Not Target', 'Researching', 'Pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const company = await Company.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json({ 
      success: true,
      message: 'Status updated successfully',
      company
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating company status' });
  }
};